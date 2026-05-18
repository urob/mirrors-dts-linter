#!/usr/bin/env node
'use strict';
const { spawnSync } = require('child_process');
const { join, dirname } = require('path');

const pkg = require('dts-linter/package.json');
const binRelPath = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin['dts-linter'];
const dtsLinter = join(dirname(require.resolve('dts-linter/package.json')), binRelPath);

const argv = process.argv.slice(2);
const quiet = argv.includes('--quiet');
const flags = argv.filter(a => a.startsWith('-') && a !== '--quiet');
const files = argv.filter(a => !a.startsWith('-'));

if (!files.length) process.exit(0);

const result = spawnSync(
  dtsLinter,
  [...flags, ...files.flatMap(f => ['--file', f])],
  { stdio: ['inherit', quiet ? 'ignore' : 'inherit', 'inherit'] },
);
if (result.error) {
  process.stderr.write(`dts-linter-hook: ${result.error.message}\n`);
  process.exit(1);
}
process.exit(result.status ?? 1);
