import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import compileApp from './compile';

const AppTemplate = path.resolve(__dirname, '../../../template/App.template.js');
const AppTargetPath = path.resolve(__dirname, '../../entry/App.js');

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
  console.log('App.js初始化成功，开始编译');
  await compileApp();
}


module.exports = initMain;
