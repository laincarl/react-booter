import webpack from 'webpack';
import initMain from '../utils/initMain';
import getProductinConfig from '../webpack/webpack.production';

export default function (userConfigFile) {
  initMain(userConfigFile).then(() => {
    webpack(getProductinConfig(userConfigFile), (err, stats) => {
      if (err !== null) {
        console.log(err);
      } else if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
      }
    });
  });
}
