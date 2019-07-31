const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge= require('webpack-merge');
const { CheckerPlugin } = require('awesome-typescript-loader')

const common= require('./webpack.config');
module.exports = merge(common,{
  mode: 'development',
  entry: path.resolve(__dirname,'../src/app.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // libraryTarget: "commonjs2"
  },
  module: {

  },
  devServer: {
    port:'8080',
    contentBase: '../dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CheckerPlugin()
  ],
});
