import path from 'path';
import { fileExist } from './common';

export default function () {
  const PROJECT_ROOT = process.cwd();
  const args = process.argv.slice(2);
  const configIndex = args.indexOf('--config');
  const configFileIndex = configIndex + 1;
  if (configIndex < 0 || args.length === 0) {
    return {};
  }
  // 判断是否--config包含了配置文件
  if (args[configFileIndex]) {
    const configFilePath = path.resolve(PROJECT_ROOT, args[configFileIndex]);
    if (!fileExist(configFilePath)) {
      console.log(configFilePath);
      console.log(`${configFilePath}文件不存在`);
    } else {
      console.log(`读取配置文件${configFilePath}`);
      const config = require(configFilePath);
      // console.log(config);
      return config;
    }
  }
}
