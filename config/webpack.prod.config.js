const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname,'../src/index.ts'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "commonjs2"
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
  },
  externals: [nodeExternals()]

};
