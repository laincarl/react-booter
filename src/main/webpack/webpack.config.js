import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LessThemePlugin from 'webpack-less-theme-plugin';
import getBabelConfig from '../../../config/babel.config';
import getUserConfig from '../utils/getUserConfig';
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const moment = require('moment');


const ROOT_DIR = path.resolve(__dirname, '../../../');
const PROJECT_ROOT = process.cwd();
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: path.resolve(ROOT_DIR, './config'), // 写到目录即可，文件名强制要求是postcss.config.js
    },
  },
};
export default function (userConfigFile, dev) {
  const { envs, webpack: Config, theme } = getUserConfig(userConfigFile);
  const ENVS = {};
  if (dev) {
    Object.keys(envs).forEach((env) => {
      ENVS[`process.env.${env}`] = JSON.stringify(envs[env]);
    });
  }
  const plugins = [
    
    // new ExtractTextPlugin('styles.css'),    
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(ENVS),
    new HtmlWebpackPlugin({
      title: '首页',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      // hash: true,
      // excludeChunks:['contact'],
      // chunks: ['manifest', 'vendor', 'app'],
      // chunks:['vendor','app'],
      favicon: path.resolve(ROOT_DIR, './template/favicon.ico'),
      template: path.resolve(ROOT_DIR, './template/index.ejs'), // Load a custom template (ejs by default see the FAQ for details)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
  ];
  if (theme) {
    plugins.push(new LessThemePlugin({ theme: path.resolve(PROJECT_ROOT, theme) }));// 使antd主题可以热加载
  }
  return merge.smart({
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
      app: [
        `webpack-dev-server/client?http://localhost:${Config.devServer.port || 3000}/`,
        'webpack/hot/only-dev-server', '@babel/polyfill',
        path.resolve(ROOT_DIR, './dist/entry/index.js'),
      ],
      // vendor: ['react', 'react-dom'], //分离第三方库
    },
    output: {
      path: path.resolve(PROJECT_ROOT, 'dist'), // 输出至项目目录
      publicPath: '/', // 以保证资源路径正确。
      filename: 'app/[name]_[hash:8].js',
      chunkFilename: 'app/chunks/[name].[chunkhash:5].chunk.js',
    },
    // 拆分与公共部分打包
    optimization: {
      // splitChunks: {
      //   chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
      //   minSize: 0,                // 最小尺寸，默认0
      //   minChunks: 1,              // 最小 chunk ，默认1
      //   maxAsyncRequests: 1,       // 最大异步请求数， 默认1
      //   maxInitialRequests: 1,     // 最大初始化请求书，默认1
      //   name: () => {},            // 名称，此选项课接收 function
      //   cacheGroups: {                // 这里开始设置缓存的 chunks
      //     priority: "0",              // 缓存组优先级 false | object |
      //     vendor: {                   // key 为entry中定义的 入口名称
      //       chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
      //       test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
      //       name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
      //       minSize: 0,
      //       minChunks: 1,
      //       enforce: true,
      //       maxAsyncRequests: 1,       // 最大异步请求数， 默认1
      //       maxInitialRequests: 1,     // 最大初始化请求书，默认1
      //       reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
      //     }
      //   }
      // }
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    resolve: {
      modules: [
        path.resolve(ROOT_DIR, 'node_modules'),
        'node_modules',
        path.resolve(process.cwd(), 'node_modules'),
        // path.resolve(process.cwd(), 'node_modules/react-booter/node_modules'),     
      ], // 优化webpack文件搜索范围
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less'],
      alias: {
        ENVS: path.resolve(ROOT_DIR, './dist/entry/constants/envs.js'),
      },
    },
    // 修复本地npm link调试时loader找不到
    resolveLoader: {
      modules: ['node_modules', path.resolve(ROOT_DIR, 'node_modules'), PROJECT_ROOT, path.join(PROJECT_ROOT, 'node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', postCssLoader],
        },
        {
          test: /\.less$/,         
          use: ['style-loader', 'css-loader', postCssLoader, {
            loader: 'less-loader',
            options: {
              // sourceMap: process.env.NODE_ENV !== 'production',
              javascriptEnabled: true,
            },
          }],
        },
        {
          test: /\.scss$/,         
          use: ['style-loader', 'css-loader', postCssLoader, 'sass-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: getBabelConfig(),
            // query: {
            //   plugins: [['import', { distraryName: 'antd', style: true }]], 
            // style: true 会加载 less 文件 style: 'css' 会加载 css 文件
            // },
          },
          ],
        },
        {
          test: /\.(ttf|eot|svg|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './app/assets/',
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img_[hash:8].[ext]',
                outputPath: './app/assets/',
              },
            },
          ],
        },
      ],
    },
    plugins,
  }, Config);
}

