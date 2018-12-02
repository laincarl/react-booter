module.exports = function getBabelNodeConfig(api) {
  api.cache(false);
  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: { node: '8.11.1' },
      }],
  ];
  const plugins = [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-optional-chaining'),
  ];
  return {
    presets,
    plugins,
  };
};
