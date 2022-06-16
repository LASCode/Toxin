const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getLoaders = () => {
  const pugLoader = () => ({
    test: /\.pug$/,
    use: [
      { loader: 'pug-loader', options: { pretty: true } },
    ],
  });
  const cssLoader = () => ({
    test: /\.css$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader', options: { sourceMap: true } },
    ],
  });
  const scssLoader = () => ({
    test: /\.scss$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'resolve-url-loader', options: { root: path.resolve(__dirname, '../') } },
      { loader: 'sass-loader', options: { sourceMap: true } },
    ],
  });
  const lessLoader = () => ({
    test: /\.less$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'resolve-url-loader', options: { sourceMap: true } },
      { loader: 'less-loader', options: { sourceMap: true } },
    ],
  });
  const fontLoader = () => ({
    test: /\.font.(svg|woff|ttf)$/,
    type: 'asset/resource',
    generator: { filename: 'fonts/[name][ext]' },
  });
  const assetsLoader = () => ({
    test: /\.(?<!font.)(png|svg|jpg|jpeg|gif)$/,
    type: 'asset/resource',
    generator: { filename: 'img/[name][ext]' },
  });
  return {
    pugLoader, cssLoader, scssLoader, fontLoader, lessLoader, assetsLoader,
  };
};

module.exports = { getLoaders };
