import path from 'path';
import merge from 'webpack-merge';
import { fileExist } from './common';
import getDefaultConfig from './getDefaultConfig';

export default function (config) {
  const PROJECT_ROOT = process.cwd();
  // 如果存在配置文件
  if (config) {
    const configFilePath = path.resolve(PROJECT_ROOT, config);
    if (!fileExist(configFilePath)) {
      console.log(configFilePath);
      console.log(`${configFilePath}文件不存在`);
    } else {
      console.log(`读取配置文件${configFilePath}`);
      const userConfig = require(configFilePath);
      // console.log(config);
      return merge.smart(getDefaultConfig(), userConfig);
    }
  } 
  return getDefaultConfig();
}
  
