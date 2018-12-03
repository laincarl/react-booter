const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const getBaseConfig = require('./webpack.config');

const ROOT_DIR = path.resolve(__dirname, '../../../');
module.exports = merge(getBaseConfig(), {
  mode: 'production',
  entry: path.resolve(ROOT_DIR, './dist/entry/index.js'), 
  devtool: false, 
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),  

    // Transfer Files
    /* new CopyWebpackPlugin([
      {from: 'src/www/css', to: 'css'},
      {from: 'src/www/images', to: 'images'}
    ]), */
  ],
});
