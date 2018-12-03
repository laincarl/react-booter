import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'opn';
import merge from 'webpack-merge';
import getConfig from '../utils/getConfig';
import getDefaultConfig from '../utils/getDefaultConfig';
import getWebpackConfig from '../webpack/webpack.config';
import serverConfig from '../webpack/serverConfig';
import initMain from '../utils/initMain';

const log = require('loglevel');

const Config = { ...getDefaultConfig(), ...getConfig() };

initMain().then(() => {
  const { devServer } = Config;
  const { port } = devServer;
  process.env.PORT = port;
  const compiler = webpack(merge(getWebpackConfig(devServer), Config));
  const server = new WebpackDevServer(compiler, { ...serverConfig, ...devServer });  
  server.listen(
    port, 'localhost',
    (err) => { 
      if (err) throw err;
      log.info(`listen on localhost:${port}`);
      console.log(`listen on localhost:${port}`);
      if (devServer.open) {
        let openOptions = {};
        let openMessage = 'Unable to open browser';
        if (typeof devServer.open === 'string') {
          openOptions = { app: devServer.open };
          openMessage += `: ${devServer.open}`;
        }
        open(`http:localhost:${port || ''}`, openOptions).catch(() => {
          log.warn(`${openMessage}`);
        });
      }
    },
  );
});
