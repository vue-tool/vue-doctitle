var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require("webpack");
var version = require("../package.json").version;
var banner =
    "/**\n" +
    " * vue-doctitle v" + version + "\n" +
    " * (c) " + new Date().getFullYear() + " bblue000\n" +
    " * https://github.com/vue-tool/vue-doctitle\n" +
    " * Released under the MIT License.\n" +
    " */\n";

module.exports = {
  entry: ['./src/vue-doctitle.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-doctitle.js'
  },
  plugins: [
      new webpack.BannerPlugin(banner, {raw: true})
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      }
    ]
  },
  vue: {
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
