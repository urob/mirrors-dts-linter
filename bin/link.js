#!/usr/bin/env node
'use strict';
const { symlinkSync, existsSync } = require('fs');
const { resolve } = require('path');

const src = resolve(__dirname, 'dts-linter-hook.js');
const dest = resolve(__dirname, '..', 'node_modules', '.bin', 'dts-linter-hook');

if (!existsSync(dest)) {
  try {
    symlinkSync(src, dest);
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
}
