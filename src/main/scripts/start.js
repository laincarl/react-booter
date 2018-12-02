import WebpackDevServer from 'webpack-dev-server';

const config = require('../webpack/webpack.config');
const serverConfig = require('../webpack/serverConfig');
const webpack = require('webpack');
const initMain = require('../utils/initMain');


initMain().then(() => {
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, serverConfig);
  server.listen(
    3000, 'localhost',
    (err) => {
      if (err) throw err;
    },
  );
});

