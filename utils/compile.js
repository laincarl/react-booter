const fs = require('fs');
const path = require('path');
const { transformSync } = require('@babel/core');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const src = path.resolve(__dirname, '../src/App.js');
const dest = path.resolve(__dirname, '../lib/App.js');
const getBabelConfig = require('../config/babel.config');

async function compile(params) {
  try {
    const data = await readFile(src, 'utf8');
    const { code } = transformSync(data, getBabelConfig(null, true));
    await writeFile(dest, code);
  } catch (error) {
    console.log('App.js编译错误:', error);
  }
}
module.exports = compile;
// (async function compile() {
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
