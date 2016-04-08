process.env.UV_THREADPOOL_SIZE = 100;

const _ = require('lodash');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
$.runSequence = require('run-sequence');
$.mergeStream = require('merge-stream');
$.parallelize = require('concurrent-transform');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const packageJson = require('./package.json');

/* DEV ********************************************************************************************/
gulp.task('dev', cb => {
  const devConfig = require('./webpack.config.dev')();
  const compiler = webpack(devConfig);

  const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    },
    publicPath: '/',
    stats: { colors: true }
  });
  server.listen(packageJson.appConfig.devPort, 'localhost', function () {});
});
