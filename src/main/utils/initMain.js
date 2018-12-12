import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import compileFiles from './compile';
import getUserConfig from './getUserConfig';

const templatePath = path.resolve(__dirname, '../../../template');
const entryPath = path.resolve(__dirname, '../../entry');
const AppTemplate = path.resolve(templatePath, 'App.template.js');
const EnvTemplate = path.resolve(templatePath, 'envs.template.js');
const AppTargetPath = path.resolve(entryPath, 'App.js');
const EnvTargetPath = path.resolve(entryPath, 'constants/envs.js');

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


async function initMain(userConfigFile) {
  const hasMain = mainExist();
  if (!hasMain) {
    console.log('main文件不存在');
  }
  const imports = hasMain ? `import Project from '${escapeWinPath(mainPath)}';` : '';
  const routes = hasMain ? '<Project />' : '<div>react booter</div>';
  // 获取用户定义环境变量
  const UserEnvs = getUserConfig(userConfigFile).envs;
  const EnvStr = Object.keys(getUserConfig(userConfigFile).envs).map((env) => {
    process.env[env] = JSON.stringify(UserEnvs[env]);
    return `${env}:process.env.${env} || '${env}'`;
  });
  const ENVS = `  {${EnvStr}}`;

  console.log(ENVS);
  await CreateFiles(AppTemplate, AppTargetPath, { imports, routes });
  await CreateFiles(EnvTemplate, EnvTargetPath, {
    ENVS,
  });
  console.log('App.js初始化成功，开始编译');
  await compileFiles();
}


module.exports = initMain;
