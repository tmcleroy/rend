const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');

module.exports = function () {
  return {
    entry: [
      `webpack-dev-server/client?http://localhost:${packageJson.appConfig.devPort}`,
      'webpack/hot/dev-server',
      path.join(__dirname, '/src/scripts/main')
    ],
    output: {
        publicPath: `http://localhost:${packageJson.appConfig.devPort}/`,
        path: path.join(__dirname, '/build/'),
        library: '[name]',
        filename: 'scripts/[name].dev.js'
    },
    resolve: {
      root: [
        path.join(__dirname, '/src'),
        path.join(__dirname, '/node_modules')
      ],
      alias: {}
    },
    resolveLoader: { root: path.join(__dirname, 'node_modules') },
    module: {
      preLoaders: [],
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src/scripts'),
          loader: 'babel-loader',
          query: {
            plugins: ['transform-runtime'], // src maps
            presets: ['es2015', 'stage-0'] // stage-0 is for experimental feature support
          }
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.ProvidePlugin({
        $: 'cash',
        '_': 'lodash'
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    debug: true
  };
};
