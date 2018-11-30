const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const AppTemplate = path.resolve(__dirname, '../template/App.template.js');
const AppTargetPath = path.resolve(__dirname, '../src/App.js');
// const packageInfo = require(getPackagePath(module));
// Object.assign(dependencies, packageInfo.dependencies);

const packagePath = path.resolve(process.cwd(), 'package.json');
const packageInfo = require(packagePath);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { main } = packageInfo;
const mainPath = path.resolve(process.cwd(), main);
function mainExist() {
  try {
    fs.accessSync(mainPath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    // console.log('main文件不存在');   
    return false;
  }
}
function escapeWinPath(Path) {
  return Path.replace(/\\/g, '\\\\');
}

async function CreateFiles(originPath, targetPath, replaceCode) {
  let data = await readFile(originPath, 'utf8');
  // 内容替换
  Object.keys(replaceCode).forEach((code) => {
    const reg = new RegExp(`{%${code}%}`, 'g');
    data = data.replace(reg, match => replaceCode[code]);
  });
  const value = await writeFile(targetPath, data);
  return value;
}


async function initMain() {
  const hasMain = mainExist();
  if (!hasMain) {
    console.log('main文件不存在');
  }
  const imports = hasMain ? [`import Project from '${escapeWinPath(mainPath)}';`] : ['']; 
  const routes = hasMain ? ['<Project />'] : ['<div>react booter</div>'];
  await CreateFiles(AppTemplate, AppTargetPath, { imports, routes });
  const { stdout, stderr } = await exec('npm run compile');
  if (stderr) {
    console.log(stderr);
  }
  // console.log('stdout:', stdout);
}


module.exports = initMain;
