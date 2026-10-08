const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');

test('AIOX CLI prints help when run directly', () => {
  const output = execFileSync(
    process.execPath,
    ['.aiox-core/cli/index.js', '--help'],
    { cwd: projectRoot, encoding: 'utf8' },
  );

  assert.match(output, /Usage: aiox/);
  assert.match(output, /metrics/);
});

test('metrics modules expose the interfaces used by the CLI', () => {
  const { MetricsCollector } = require('../.aiox-core/quality/metrics-collector');
  const { generateSeedData, seedMetrics } = require('../.aiox-core/quality/seed-metrics');

  assert.equal(typeof MetricsCollector, 'function');
  assert.equal(typeof generateSeedData, 'function');
  assert.equal(typeof seedMetrics, 'function');
});
