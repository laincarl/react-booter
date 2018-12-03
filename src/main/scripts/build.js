import webpack from 'webpack';
import initMain from '../utils/initMain';
import config from '../webpack/webpack.production';

initMain().then(() => {
  webpack(config, (err, stats) => {
    if (err !== null) {
      console.log(err);
    } else if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
    }
  });
});

