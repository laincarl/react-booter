import webpack from 'webpack';
import initMain from '../utils/initMain';
import getAnalyzeConfig from '../webpack/webpack.analyze';

console.log('ana');
initMain().then(() => {
  webpack(getAnalyzeConfig(), (err, stats) => {
    if (err !== null) {
      console.log(err);
    } else if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
    }
  });
});
