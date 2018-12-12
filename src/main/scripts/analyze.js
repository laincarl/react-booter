import webpack from 'webpack';
import initMain from '../utils/initMain';
import getAnalyzeConfig from '../webpack/webpack.analyze';

export default function (userConfigFile) {
  initMain(userConfigFile).then(() => {
    webpack(getAnalyzeConfig(userConfigFile), (err, stats) => {
      if (err !== null) {
        console.log(err);
      } else if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
      }
    });
  });
}
