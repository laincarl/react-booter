"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExist = fileExist;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fileExist(path) {
  try {
    _fs.default.accessSync(path, _fs.default.constants.R_OK | _fs.default.constants.W_OK);

    return true;
  } catch (err) {
    // console.log('main文件不存在');   
    return false;
  }
}