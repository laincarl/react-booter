import fs from 'fs';

export function fileExist(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    // console.log('main文件不存在');   
    return false;
  }
}
