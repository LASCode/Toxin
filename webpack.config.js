const path = require('path');
const { getLoaders } = require('./webpack/loaders');
const { fileManager } = require('./webpack/file-manager');
const { getPlugins } = require('./webpack/plugins');

const {
  pugLoader,
  cssLoader,
  scssLoader,
  lessLoader,
  fontLoader,
  assetsLoader,
} = getLoaders(__dirname);
const {
  getProvidePluginArr,
  getCopyWebpackPluginArr,
  getMiniCssExtractPluginArr,
  getHtmlWebpackPluginArr,
} = getPlugins(__dirname);
const {
  getEntryPoints,
} = fileManager(__dirname);

module.exports = {
  entry: getEntryPoints(),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      pugLoader(),
      cssLoader(),
      scssLoader(),
      lessLoader(),
      fontLoader(),
      assetsLoader(),
    ],
  },
  plugins: [
    ...getHtmlWebpackPluginArr(),
    ...getCopyWebpackPluginArr(),
    ...getMiniCssExtractPluginArr(),
    ...getProvidePluginArr(),
  ],
};
