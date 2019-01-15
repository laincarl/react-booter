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
const writeFile = promisify(fs.writeFile); // const src = path.resolve(__dirname, '../../entry/App.js');
// const dest = path.resolve(__dirname, '../../../dist/entry/App.js');

const getBabelConfig = require('../../../config/babel.config'); // const src = path.resolve(__dirname, '../../entry/constants/envs.js');
// const dest = path.resolve(__dirname, '../../../dist/entry/constants/envs.js');


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

module.exports = compileFiles; // (async function compile() {
//   const files = await traversefolder(src);
//   Promise.all(files.map(file => new Promise((resolve) => {
//     const isJsfile = /\.js/.test(file);
//     const destpath = path.resolve(dest, file);
//     console.log(`dest:${destpath}`);
//     if (isJsfile) {
//       readFile(file, 'utf8').then((data) => {
//         const { code } = transform(data, options);
//         // console.log(code);
//         writeFile(destpath, data).then((res) => {
//           resolve(code);
//         });
//       });
//     } else {
//       console.log('not js');
//       resolve('code');
//     }
//   })));
// }());