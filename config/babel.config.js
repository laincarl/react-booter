module.exports = {
  presets: [
    ['es2015'], 'react', 'stage-1',
  ],
  plugins: ['transform-decorators-legacy', 'react-hot-loader/babel', [
    'import',
    {
      libraryName: 'antd',
      style: true,
    },
  ]],
};

