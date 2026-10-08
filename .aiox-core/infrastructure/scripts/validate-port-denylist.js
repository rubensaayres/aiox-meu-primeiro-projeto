'use strict';

const { scanProject } = require('../../core/security/port-denylist');

const result = scanProject({ projectRoot: process.cwd() });
if (result.ok) {
  console.log(`Port denylist clean (${result.filesScanned} files scanned).`);
} else {
  console.error(`Port denylist found ${result.findings.length} issue(s):`);
  for (const finding of result.findings) {
    console.error(`- ${finding.file}:${finding.line} [${finding.id}]`);
  }
  process.exitCode = 1;
}
