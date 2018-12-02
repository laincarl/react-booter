const config = require('../webpack/webpack.production');
const webpack = require('webpack');
const initMain = require('../utils/initMain');


initMain().then(() => {
  webpack(config, (err, stats) => {
    if (err !== null) {
      console.log(err);
    } else if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
    }
  });
});
