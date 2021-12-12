const fs = require('fs'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      {ProvidePlugin} = require('webpack'),
      getLoaders = require('./loaders'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      copyWebpackPlugin = require("copy-webpack-plugin"),
      createProjectManager = require('./projectFunc')

const {PM_entries, PM_fun, PM_path, PM_pages} = createProjectManager(path.resolve(__dirname, '../'))
module.exports = {
  entry: PM_entries,
  output: {
    filename: "js/[name].js",
    path: PM_path.dist
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: getLoaders.pug()
      },
      {
        test: /\.css$/,
        use: getLoaders.css()
      },
      {
        test: /\.scss$/,
        use: getLoaders.scss()
      },
      {
        test: /\.less$/,
        use: getLoaders.less()
      },
      {
        test: /\.font.(svg|woff|ttf)$/,
        type: "asset/resource",
        generator: {filename: 'fonts/[name][ext]'}
      },
    ]
  },
  plugins: [
    ...PM_fun.getFilesByType(PM_pages, 'pug').map(page=> new HtmlWebpackPlugin({
      filename: `./${page.fileName.replace(/\.pug/,'.html')}`,
      template: page.filePath,
      chunks: [page.pageName]
    })),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new ProvidePlugin({
      $:'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new copyWebpackPlugin({
      patterns: [
        {from: path.resolve(PM_path.src, "assets/img"), to: path.resolve(PM_path.dist, "img")}
      ]
    })
  ]
}