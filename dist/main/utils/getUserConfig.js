"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _common = require("./common");

var _getDefaultConfig = _interopRequireDefault(require("./getDefaultConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */
function _default(config) {
  const PROJECT_ROOT = process.cwd(); // 如果存在配置文件

  if (config) {
    const configFilePath = _path.default.resolve(PROJECT_ROOT, config);

    if (!(0, _common.fileExist)(configFilePath)) {
      console.log(configFilePath);
      console.log(`${configFilePath}文件不存在`);
    } else {
      console.log(`读取配置文件${configFilePath}`);

      const userConfig = require(configFilePath); // console.log(config);


      return _webpackMerge.default.smart((0, _getDefaultConfig.default)(), userConfig);
    }
  }

  return (0, _getDefaultConfig.default)();
}