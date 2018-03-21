// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript');
const tsConfig = require('./buildtests/tsconfig.json');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      return tsc.transpile(src, tsConfig.compilerOptions, path, []);
    }
    return src;
  },
};