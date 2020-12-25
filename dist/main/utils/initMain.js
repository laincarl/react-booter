"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = require("util");

var _compile = _interopRequireDefault(require("./compile"));

var _getUserConfig = _interopRequireDefault(require("./getUserConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const templatePath = _path.default.resolve(__dirname, '../../../template');

const entryPath = _path.default.resolve(__dirname, '../../entry');

const AppTemplate = _path.default.resolve(templatePath, 'App.template.js');

const EnvTemplate = _path.default.resolve(templatePath, 'envs.template.js');

const AppTargetPath = _path.default.resolve(entryPath, 'App.js');

const EnvTargetPath = _path.default.resolve(entryPath, 'constants/envs.js');

const packagePath = _path.default.resolve(process.cwd(), 'package.json');

const packageInfo = require(packagePath);

const readFile = (0, _util.promisify)(_fs.default.readFile);
const writeFile = (0, _util.promisify)(_fs.default.writeFile);
const {
  main
} = packageInfo;

const mainPath = _path.default.resolve(process.cwd(), main);

function mainExist() {
  try {
    _fs.default.accessSync(mainPath, _fs.default.constants.R_OK | _fs.default.constants.W_OK);

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
  let data = await readFile(originPath, 'utf8'); // 内容替换

  Object.keys(replaceCode).forEach(code => {
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
  const routes = hasMain ? '<Project />' : '<div>react booter</div>'; // 获取用户定义环境变量

  const UserEnvs = (0, _getUserConfig.default)(userConfigFile).envs;
  const EnvStr = Object.keys((0, _getUserConfig.default)(userConfigFile).envs).map(env => `${env}:process.env.${env} || '${env}'`);
  const ENVS = `{${EnvStr}}`;
  console.log(UserEnvs, ENVS);
  await CreateFiles(AppTemplate, AppTargetPath, {
    imports,
    routes
  });
  await CreateFiles(EnvTemplate, EnvTargetPath, {
    ENVS
  });
  console.log('App.js初始化成功，开始编译');
  await (0, _compile.default)();
}

module.exports = initMain;