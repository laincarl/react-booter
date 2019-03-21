// babel之所以采用这种方法配置是因为babel在npm link本地调试时，babel-core@6.1.21后的版本babel会找不到presets和plugins
// 升级babel7之后发现单独编译文件带有react-hot-loader会报错
module.exports = function getBabelConfig(api, withoutHot) {
  // babel/cli调用时会传api参数
  if (api) {
    api.cache(false);
  }
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ].map(require.resolve);
  const plugins = [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-optional-chaining'),
    [
      require.resolve('@babel/plugin-proposal-decorators'),
      {
        legacy: true,
      },
    ],
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      {
        loose: true,
      },
    ],
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'choerodon-ui',
        style: true,
      },
      'choerodon-ui',
    ],
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        style: true,
      },
      'antd',
    ],
  ];
  if (!withoutHot) {
    plugins.push(require.resolve('react-hot-loader/babel'));
  }
  return {
    presets,
    plugins,
  };
};
