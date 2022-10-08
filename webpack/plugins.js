const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ProvidePlugin } = require('webpack');

const getPlugins = (rootDir) => {
  const srcDis = path.resolve(rootDir, 'src');
  const pagesDir = path.resolve(srcDis, 'pages');
  const distDir = path.resolve(rootDir, 'dist');

  const getHtmlWebpackPluginArr = () => {
    const result = [];
    fs.readdirSync(pagesDir).forEach((page) => {
      const pageDir = path.resolve(pagesDir, page);
      const filesInPageFolder = fs.readdirSync(pageDir);
      const hasPugFile = filesInPageFolder.some((el) => el.endsWith('pug'));
      const hasJsFile = filesInPageFolder.some((el) => el.endsWith('js'));
      const hasScssFile = filesInPageFolder.some((el) => el.endsWith('scss'));
      const isReallyPage = hasPugFile && hasScssFile && hasJsFile;
      if (isReallyPage) {
        result.push(new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: path.resolve(pageDir, `${page}.pug`),
          inject: 'body',
          chunks: [page],
        }));
      }
    });
    return result;
  };
  const getMiniCssExtractPluginArr = () => {
    const result = [];
    result.push(new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }));
    return result;
  };
  const getCopyWebpackPluginArr = () => {
    const result = [];
    result.push(new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(srcDis, 'assets/img'), to: path.resolve(distDir, 'img') },
        { from: path.resolve(srcDis, 'assets/favicon'), to: path.resolve(distDir, 'img/favicon') },
      ],
    }));
    return result;
  };
  const getProvidePluginArr = () => {
    const result = [];
    result.push(new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }));
    return result;
  };

  return {
    getHtmlWebpackPluginArr,
    getMiniCssExtractPluginArr,
    getCopyWebpackPluginArr,
    getProvidePluginArr,
  };
};

module.exports = { getPlugins };
