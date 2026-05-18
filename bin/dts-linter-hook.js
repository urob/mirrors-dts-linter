#!/usr/bin/env node
'use strict';
const { spawnSync } = require('child_process');

const argv = process.argv.slice(2);
const flags = argv.filter(a => a.startsWith('-'));
const files = argv.filter(a => !a.startsWith('-'));

if (!files.length) process.exit(0);

const result = spawnSync(
  'dts-linter',
  [...flags, ...files.flatMap(f => ['--file', f])],
  { stdio: ['inherit', 'ignore', 'inherit'] },
);
process.exit(result.status ?? 1);
