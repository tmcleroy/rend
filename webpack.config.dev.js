const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        path: path.join(__dirname, '/build/'),
        publicPath: `http://localhost:${packageJson.appConfig.devPort}/`,
        library: '[name]',
        filename: 'scripts/[name].dev.js'
    },
    resolve: {
      root: [
        path.join(__dirname, '/src'),
        path.join(__dirname, '/node_modules')
      ]
    },
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
          test: /\.scss|\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }
      ]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new ExtractTextPlugin('styles/[name].dev.css'),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    devtool: 'inline-source-map',
    debug: true
  };
};
