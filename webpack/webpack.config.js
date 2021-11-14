const fs = require('fs'),
      path = require('path'),
      getLoaders = require('./loaders'),
      createProjectManager = require('./projectFunc')

const {PM_entries, PM_fun, PM_path} = createProjectManager(path.resolve(__dirname, '../'))
console.log(PM_entries)
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
  plugins: []
}