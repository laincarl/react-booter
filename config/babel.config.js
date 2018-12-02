// babel之所以采用这种方法配置是因为babel在npm link本地调试时，babel-core@6.1.21后的版本babel会找不到presets和plugins
module.exports = function getBabelConfig() {
  const presets = [
    'babel-preset-es2015',
    'babel-preset-react', 
    'babel-preset-stage-1',
  ].map(require.resolve);
  const plugins = [
    require.resolve('babel-plugin-transform-decorators-legacy'), 
    require.resolve('react-hot-loader/babel'),
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ];  
  return {
    presets,
    plugins,
  };
};
