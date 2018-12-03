import webpack from 'webpack';
import initMain from '../utils/initMain';
import getProductinConfig from '../webpack/webpack.production';

initMain().then(() => {
  webpack(getProductinConfig(), (err, stats) => {
    if (err !== null) {
      console.log(err);
    } else if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
    }
  });
});

