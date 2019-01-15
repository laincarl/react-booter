"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _babel = _interopRequireDefault(require("../../../config/babel.config"));

var _getUserConfig = _interopRequireDefault(require("../utils/getUserConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const LessThemePlugin = require('webpack-less-theme-plugin');
// const moment = require('moment');
const ROOT_DIR = _path.default.resolve(__dirname, '../../../');

const PROJECT_ROOT = process.cwd();

function _default(userConfigFile, dev) {
  const {
    envs,
    webpack: Config
  } = (0, _getUserConfig.default)(userConfigFile);
  const ENVS = {};

  if (dev) {
    Object.keys(envs).forEach(env => {
      ENVS[`process.env.${env}`] = JSON.stringify(envs[env]);
    });
  }

  return (0, _webpackMerge.default)(Config, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
      app: [`webpack-dev-server/client?http://localhost:${Config.devServer.port || 3000}/`, 'webpack/hot/only-dev-server', '@babel/polyfill', _path.default.resolve(ROOT_DIR, './dist/entry/index.js')] // vendor: ['react', 'react-dom'], //分离第三方库

    },
    output: {
      path: _path.default.resolve(PROJECT_ROOT, 'dist'),
      // 输出至项目目录
      publicPath: '/',
      // 以保证资源路径正确。
      filename: 'app/[name]_[hash:8].js',
      chunkFilename: 'app/chunks/[name].[chunkhash:5].chunk.js'
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
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    resolve: {
      modules: [_path.default.resolve(ROOT_DIR, 'node_modules'), 'node_modules', _path.default.resolve(process.cwd(), 'node_modules')],
      // 优化webpack文件搜索范围
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less'],
      alias: {
        ENVS: _path.default.resolve(ROOT_DIR, './dist/entry/constants/envs.js')
      }
    },
    // 修复本地npm link调试时loader找不到
    resolveLoader: {
      modules: ['node_modules', _path.default.resolve(ROOT_DIR, 'node_modules'), PROJECT_ROOT, _path.default.join(PROJECT_ROOT, 'node_modules')]
    },
    module: {
      rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader' // options: {
          //   modules: true,
          //   localIdentName: '[name]__[local]___[hash:base64:5]',
          // },

        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: _path.default.resolve(ROOT_DIR, './config') // 写到目录即可，文件名强制要求是postcss.config.js

            }
          }
        }]
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader' // options: {
          //   modules: true,
          //   localIndexName: '[name]__[local]___[hash:base64:5]',
          // },

        }]
      }, {
        test: /\.less$/,
        exclude: [/node_modules/, /theme\.less/],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader' // options: {
          //   modules: true,
          //   localIdentName: '[name]__[local]___[hash:base64:5]',
          // },

        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: _path.default.resolve(ROOT_DIR, './config') // 写到目录即可，文件名强制要求是postcss.config.js

            }
          }
        }, {
          loader: 'less-loader',
          options: {
            // sourceMap: process.env.NODE_ENV !== 'production',
            javascriptEnabled: true
          }
        }]
      }, {
        test: /\.less$/,
        include: [/node_modules/, /theme\.less/],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            // sourceMap: process.env.NODE_ENV !== 'production',
            javascriptEnabled: true
          }
        }]
      }, {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            autoprefixer: false
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: _path.default.resolve(ROOT_DIR, './config') // 写到目录即可，文件名强制要求是postcss.config.js

            }
          }
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.scss$/,
        include: [/node_modules/],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: (0, _babel.default)() // query: {
          //   plugins: [['import', { distraryName: 'antd', style: true }]], 
          // style: true 会加载 less 文件 style: 'css' 会加载 css 文件
          // },

        }]
      }, {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './app/assets/'
          }
        }]
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img_[hash:8].[ext]',
            outputPath: './app/assets/'
          }
        }]
      }]
    },
    // devServer: {
    //   contentBase: path.resolve(ROOT_DIR, 'dist'),
    //   hot: true,
    //   compress: true,
    //   port: 3000,
    //   host: '0.0.0.0', // 允许局域网通过ip访问
    //   public: 'localhost:3000', // 加了host之后，open会打开0.0.0.0，所以需要定义public
    //   stats: 'errors-only',
    //   open: true,
    //   historyApiFallback: true, // 支持browerhistory
    //   // 不需要设置跨域，直接后台设置允许跨域
    //   // proxy: {
    //   //   // /test => http://localhost:8000/test
    //   //   '/api/**': {
    //   //     target: 'http://localhost:8000',
    //   //     changeOrigin: true,
    //   //     // pathRewrite: { '^/api': '' },
    //   //   },
    //   // },
    // },
    plugins: [// new LessThemePlugin({ theme: path.resolve(ROOT_DIR, './theme.less') }), // 使antd主题可以热加载
    // new ExtractTextPlugin('styles.css'),    
    // new webpack.HotModuleReplacementPlugin(),
    new _webpack.default.DefinePlugin(ENVS), new _htmlWebpackPlugin.default({
      title: '首页',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      // hash: true,
      // excludeChunks:['contact'],
      // chunks: ['manifest', 'vendor', 'app'],
      // chunks:['vendor','app'],
      favicon: _path.default.resolve(ROOT_DIR, './template/favicon.ico'),
      template: _path.default.resolve(ROOT_DIR, './template/index.ejs') // Load a custom template (ejs by default see the FAQ for details)

    }), new _webpack.default.IgnorePlugin(/^\.\/locale$/, /moment$/), new _webpack.default.HotModuleReplacementPlugin()]
  });
}