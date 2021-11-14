const fs = require('fs'),
      path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getLoaders = {
  pug(){
    return [
      {loader: "pug-loader", options: { pretty: true }}
    ]
  },
  scss(){
    return [
      MiniCssExtractPlugin.loader,
      {loader: "css-loader", options: { sourceMap: true }},
      {loader: "resolve-url-loader", options: {root: path.resolve(__dirname, '../')}},
      {loader: "sass-loader", options: { sourceMap: true }}
    ]
  },
}

module.exports = getLoaders