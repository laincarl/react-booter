const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function traversefolder(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    if (subdir !== 'System Volume Information') {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? traversefolder(res) : res;
    }
  }));
  return files.reduce((a, f) => a.concat(f), []);
}
module.exports = traversefolder;
