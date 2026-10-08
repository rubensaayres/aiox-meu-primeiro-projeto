/**
 * Persistence and aggregation for the quality metrics CLI.
 *
 * @module quality/metrics-collector
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_RETENTION_DAYS = 30;
const DATA_FILE = path.join(process.cwd(), '.aiox', 'data', 'quality-metrics.json');

class MetricsCollector {
  constructor(options = {}) {
    this.retentionDays = Number.isFinite(Number(options.retentionDays))
      ? Number(options.retentionDays)
      : DEFAULT_RETENTION_DAYS;
  }

  async recordRun(layerNum, result = {}) {
    if (![1, 2, 3].includes(Number(layerNum))) {
      throw new RangeError('Layer must be 1, 2, or 3');
    }
    return this._appendRecord(Number(layerNum), result);
  }

  async recordPRReview(result = {}) {
    return this._appendRecord(2, result);
  }

  async getMetrics() {
    const history = await this._readHistory();
    return buildMetrics(history, this.retentionDays);
  }

  async export(format) {
    if (format !== 'csv') throw new Error(`Unsupported metrics export format: ${format}`);
    const { history } = await this.getMetrics();
    const columns = ['timestamp', 'layer', 'passed', 'durationMs', 'findingsCount'];
    const rows = history.map((record) => columns.map((column) => csvCell(record[column])).join(','));
    return [columns.join(','), ...rows].join('\n');
  }

  async cleanup() {
    const history = await this._readHistory();
    const cutoff = Date.now() - this.retentionDays * 24 * 60 * 60 * 1000;
    const retained = history.filter((record) => new Date(record.timestamp).getTime() > cutoff);
    const removed = history.length - retained.length;
    if (removed > 0) await this._writeHistory(retained);
    return removed;
  }

  async _appendRecord(layer, result) {
    const history = await this._readHistory();
    const record = {
      timestamp: result.timestamp || new Date().toISOString(),
      layer,
      passed: result.passed !== false,
      durationMs: finiteNumber(result.durationMs),
      findingsCount: finiteNumber(result.findingsCount),
      metadata: result.metadata && typeof result.metadata === 'object' ? result.metadata : {},
    };
    if (result.coderabbit) record.coderabbit = result.coderabbit;
    if (result.quinn) record.quinn = result.quinn;
    if (!Number.isFinite(new Date(record.timestamp).getTime())) {
      throw new TypeError('Metric timestamp must be a valid date');
    }
    history.push(record);
    await this._writeHistory(history);
    return record;
  }

  async _readHistory() {
    let contents;
    try {
      contents = await fs.promises.readFile(DATA_FILE, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
    let data;
    try {
      data = JSON.parse(contents);
    } catch (error) {
      throw new Error(`Unable to parse metrics data at ${DATA_FILE}: ${error.message}`);
    }
    if (!data || !Array.isArray(data.history)) {
      throw new Error(`Invalid metrics data at ${DATA_FILE}: expected a history array`);
    }
    return data.history.filter((record) => record && [1, 2, 3].includes(Number(record.layer))
      && Number.isFinite(new Date(record.timestamp).getTime()));
  }

  async _writeHistory(history) {
    const directory = path.dirname(DATA_FILE);
    await fs.promises.mkdir(directory, { recursive: true });
    const contents = `${JSON.stringify({ lastUpdated: new Date().toISOString(), retentionDays: this.retentionDays, history }, null, 2)}\n`;
    const temporaryFile = `${DATA_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.promises.writeFile(temporaryFile, contents, 'utf8');
    await fs.promises.rename(temporaryFile, DATA_FILE);
  }
}

function buildMetrics(history, retentionDays) {
  const layers = {};
  for (const layerNum of [1, 2, 3]) {
    const key = `layer${layerNum}`;
    const records = history.filter((record) => Number(record.layer) === layerNum);
    const passed = records.filter((record) => record.passed).length;
    const durationTotal = records.reduce((sum, record) => sum + finiteNumber(record.durationMs), 0);
    layers[key] = {
      totalRuns: records.length,
      passRate: records.length ? passed / records.length : 0,
      avgTimeMs: records.length ? Math.round(durationTotal / records.length) : 0,
      lastRun: records.length ? records[records.length - 1].timestamp : null,
    };
  }

  const prReviews = history.filter((record) => Number(record.layer) === 2);
  const coderabbitRecords = prReviews.filter((record) => record.coderabbit);
  const quinnRecords = prReviews.filter((record) => record.quinn);
  if (coderabbitRecords.length) {
    const severityBreakdown = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const record of coderabbitRecords) {
      for (const severity of Object.keys(severityBreakdown)) {
        severityBreakdown[severity] += finiteNumber(record.coderabbit.severityBreakdown?.[severity]);
      }
    }
    layers.layer2.coderabbit = {
      active: true,
      findingsCount: coderabbitRecords.reduce((sum, record) => sum + finiteNumber(record.coderabbit.findingsCount), 0),
      severityBreakdown,
    };
  }
  if (quinnRecords.length) {
    const categories = new Map();
    for (const record of quinnRecords) {
      for (const category of record.quinn.topCategories || []) {
        categories.set(category, (categories.get(category) || 0) + 1);
      }
    }
    layers.layer2.quinn = {
      findingsCount: quinnRecords.reduce((sum, record) => sum + finiteNumber(record.quinn.findingsCount), 0),
      topCategories: [...categories.entries()].sort((a, b) => b[1] - a[1]).map(([category]) => category).slice(0, 5),
    };
  }

  const daily = new Map();
  for (const record of history) {
    const date = record.timestamp.slice(0, 10);
    const item = daily.get(date) || { passed: 0, total: 0 };
    item.total += 1;
    if (record.passed) item.passed += 1;
    daily.set(date, item);
  }
  const passRates = [...daily.entries()].sort(([a], [b]) => a.localeCompare(b))
    .map(([date, item]) => ({ date, value: item.passed / item.total }));

  return {
    lastUpdated: history.length ? history[history.length - 1].timestamp : null,
    retentionDays,
    history,
    layers,
    trends: { passRates, autoCatchRate: [] },
  };
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function csvCell(value) {
  const text = value === undefined || value === null ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

module.exports = { MetricsCollector };
