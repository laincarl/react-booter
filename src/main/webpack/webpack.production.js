import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import getBaseConfig from './webpack.config';

const ROOT_DIR = path.resolve(__dirname, '../../../');
const PROJECT_ROOT = process.cwd();
export default function (userConfigFile) {
  return merge.smart(getBaseConfig(userConfigFile), {
    mode: 'production',
    entry: path.resolve(ROOT_DIR, './dist/entry/index.js'),
    devtool: 'hidden-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new CleanWebpackPlugin(['dist'], { root: PROJECT_ROOT }), // build之前清理dist文件夹
    ],
  });
}
