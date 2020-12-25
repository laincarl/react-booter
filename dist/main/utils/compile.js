"use strict";

const fs = require('fs');

const path = require('path');

const {
  transformSync
} = require('@babel/core');

const {
  promisify
} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getBabelConfig = require('../../../config/babel.config');

const basePath = path.resolve(__dirname, '../../entry');
const baseTargetPath = path.resolve(__dirname, '../../../dist/entry');

async function compile(src, dest) {
  try {
    const data = await readFile(src, 'utf8');
    const {
      code
    } = transformSync(data, getBabelConfig(null, true));
    await writeFile(dest, code);
    console.log(`${src}编译成功`);
  } catch (error) {
    console.log(`${src}编译错误:`, error);
  }
}

async function compileFiles() {
  const paths = ['App.js', 'constants/envs.js'];
  const srcPaths = paths.map(p => path.resolve(basePath, p));
  const targetPaths = paths.map(p => path.resolve(baseTargetPath, p));
  Promise.all(srcPaths.map(async (src, i) => {
    await compile(src, targetPaths[i]);
  }));
}

module.exports = compileFiles;