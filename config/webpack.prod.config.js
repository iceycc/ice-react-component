const path = require("path");
const nodeExternals = require("webpack-node-externals");
const merge= require('webpack-merge');
const common= require('./webpack.config');

module.exports =merge(common, {
  mode: "production",
  entry: path.resolve(__dirname,'../src/index.ts'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals()]
});
