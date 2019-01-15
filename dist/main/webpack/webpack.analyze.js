"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _webpack = _interopRequireDefault(require("./webpack.production"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: LainCarl 
 * @Date: 2018-05-19 16:58:41 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-12-04 10:58:14
 * @Feature: webpack打包分析 
 */
function _default(userConfigFile) {
  return (0, _webpackMerge.default)((0, _webpack.default)(userConfigFile), {
    plugins: [new _webpackBundleAnalyzer.BundleAnalyzerPlugin()]
  });
}