const fs = require('fs'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      getLoaders = require('./loaders'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      createProjectManager = require('./projectFunc')

const {PM_entries, PM_fun, PM_path, PM_pages} = createProjectManager(path.resolve(__dirname, '../'))
module.exports = {
  entry: PM_entries,
  output: {
    filename: "js/[name].js",
    path: PM_path.dist
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: getLoaders.pug()
      },
      {
        test: /\.(s*)css$/,
        use: getLoaders.scss()
      },
      {
        test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
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
    }))
  ]
}