"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _path = _interopRequireDefault(require("path"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _webpack2 = _interopRequireDefault(require("./webpack.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROOT_DIR = _path.default.resolve(__dirname, '../../../');

const PROJECT_ROOT = process.cwd();

function _default(userConfigFile) {
  return _webpackMerge.default.smart((0, _webpack2.default)(userConfigFile), {
    mode: 'production',
    entry: _path.default.resolve(ROOT_DIR, './dist/entry/index.js'),
    devtool: 'hidden-source-map',
    plugins: [new _webpack.default.LoaderOptionsPlugin({
      minimize: true
    }), new _cleanWebpackPlugin.default(['dist'], {
      root: PROJECT_ROOT
    }) // build之前清理dist文件夹
    ]
  });
}