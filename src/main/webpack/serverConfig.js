const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../');
export default {
  inline: false,
  compress: true,
  disableHostCheck: true,
  contentBase: path.join(process.cwd(), 'dist'),
  hot: true,

  publicPath: '/',
  // publicPath: process.cwd(),
  port: 3000,
  // host: '0.0.0.0', // 允许局域网通过ip访问
  // public: 'localhost:3000', // 加了host之后，open会打开0.0.0.0，所以需要定义public
  stats: 'errors-only',
  open: true,
  historyApiFallback: true, // 支持browerhistory
};

