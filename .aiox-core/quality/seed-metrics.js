/**
 * Seed data generation for the quality metrics CLI.
 *
 * @module quality/seed-metrics
 */

const { MetricsCollector } = require('./metrics-collector');

function generateSeedData(options = {}) {
  const days = positiveInteger(options.days, 30);
  const runsPerDay = positiveInteger(options.runsPerDay, 8);
  const weekendReduction = options.weekendReduction !== false;
  const history = [];
  const now = Date.now();

  for (let dayOffset = days - 1; dayOffset >= 0; dayOffset -= 1) {
    const day = new Date(now - dayOffset * 24 * 60 * 60 * 1000);
    const weekend = day.getUTCDay() === 0 || day.getUTCDay() === 6;
    const dailyRuns = weekendReduction && weekend ? Math.max(1, Math.ceil(runsPerDay / 3)) : runsPerDay;
    for (let runIndex = 0; runIndex < dailyRuns; runIndex += 1) {
      const layer = (runIndex % 3) + 1;
      const failed = (dayOffset + runIndex) % 9 === 0;
      const record = {
        timestamp: new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 9 + (runIndex % 10), (runIndex * 5) % 60)).toISOString(),
        layer,
        passed: !failed,
        durationMs: layer === 1 ? 2500 + runIndex * 130 : layer === 2 ? 12000 + runIndex * 400 : 30000 + runIndex * 900,
        findingsCount: failed ? (runIndex % 4) + 1 : 0,
        metadata: { triggeredBy: 'seed' },
      };
      if (layer === 2) {
        record.coderabbit = {
          findingsCount: failed ? 2 : 0,
          severityBreakdown: { critical: 0, high: failed ? 1 : 0, medium: failed ? 1 : 0, low: 0 },
        };
        record.quinn = { findingsCount: failed ? 1 : 0, topCategories: failed ? ['quality'] : [] };
      }
      history.push(record);
    }
  }

  return aggregateSeed(history);
}

async function seedMetrics(options = {}) {
  const generated = generateSeedData(options);
  const collector = new MetricsCollector();
  for (const record of generated.history) {
    if (record.layer === 2) await collector.recordPRReview(record);
    else await collector.recordRun(record.layer, record);
  }
  await collector.cleanup();
  return collector.getMetrics();
}

function aggregateSeed(history) {
  const layers = {};
  for (const layerNum of [1, 2, 3]) {
    const records = history.filter((record) => record.layer === layerNum);
    layers[`layer${layerNum}`] = {
      totalRuns: records.length,
      passRate: records.length ? records.filter((record) => record.passed).length / records.length : 0,
      avgTimeMs: records.length ? Math.round(records.reduce((sum, record) => sum + record.durationMs, 0) / records.length) : 0,
      lastRun: records.length ? records[records.length - 1].timestamp : null,
    };
  }

  const dates = new Map();
  for (const record of history) {
    const date = record.timestamp.slice(0, 10);
    const counts = dates.get(date) || { passed: 0, total: 0 };
    counts.total += 1;
    if (record.passed) counts.passed += 1;
    dates.set(date, counts);
  }
  return {
    lastUpdated: history.length ? history[history.length - 1].timestamp : null,
    retentionDays: 30,
    history,
    layers,
    trends: {
      passRates: [...dates.entries()].sort(([a], [b]) => a.localeCompare(b))
        .map(([date, counts]) => ({ date, value: counts.passed / counts.total })),
      autoCatchRate: [],
    },
  };
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

module.exports = { generateSeedData, seedMetrics };
