"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _opn = _interopRequireDefault(require("opn"));

var _webpack2 = _interopRequireDefault(require("../webpack/webpack.config"));

var _serverConfig = _interopRequireDefault(require("../webpack/serverConfig"));

var _initMain = _interopRequireDefault(require("../utils/initMain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = require('loglevel');

function _default(userConfigFile) {
  const Config = (0, _webpack2.default)(userConfigFile, true);
  (0, _initMain.default)(userConfigFile).then(() => {
    const {
      devServer
    } = Config;
    const {
      port
    } = devServer;
    process.env.PORT = port;
    const compiler = (0, _webpack.default)(Config);
    const server = new _webpackDevServer.default(compiler, { ..._serverConfig.default,
      ...devServer
    });
    server.listen(port, 'localhost', err => {
      if (err) throw err;
      log.info(`listen on localhost:${port}`);
      console.log(`listen on localhost:${port}`);

      if (devServer.open) {
        let openOptions = {};
        let openMessage = 'Unable to open browser';

        if (typeof devServer.open === 'string') {
          openOptions = {
            app: devServer.open
          };
          openMessage += `: ${devServer.open}`;
        }

        (0, _opn.default)(`http:localhost:${port || ''}`, openOptions).catch(() => {
          log.warn(`${openMessage}`);
        });
      }
    });
  });
}