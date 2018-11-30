const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config');

const ROOT_DIR = path.resolve(__dirname, '../');
module.exports = merge(baseConfig, {
  mode: 'production',
  entry: path.resolve(ROOT_DIR, './src/index.js'), 
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
