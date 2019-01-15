"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpack = _interopRequireDefault(require("webpack"));

var _initMain = _interopRequireDefault(require("../utils/initMain"));

var _webpack2 = _interopRequireDefault(require("../webpack/webpack.analyze"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(userConfigFile) {
  (0, _initMain.default)(userConfigFile).then(() => {
    (0, _webpack.default)((0, _webpack2.default)(userConfigFile), (err, stats) => {
      if (err !== null) {
        console.log(err);
      } else if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
      }
    });
  });
}