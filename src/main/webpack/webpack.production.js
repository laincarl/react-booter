import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';

import getBaseConfig from './webpack.config';

const ROOT_DIR = path.resolve(__dirname, '../../../');
export default function () {
  return merge(getBaseConfig(), {
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
}
