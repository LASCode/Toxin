const fs = require('fs'),
      path = require('path'),
      getLoaders = require('./loaders'),
      createProjectManager = require('./projectFunc')


module.exports = {
  entry: {},
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {},
  plugins: []
}