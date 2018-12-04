/*
 * @Author: LainCarl 
 * @Date: 2018-05-19 16:58:41 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-19 16:59:02
 * @Feature: webpack打包分析 
 */

import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import getProductinConfig from './webpack.production';

export default function () {
  return merge(getProductinConfig(), {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  });
}
