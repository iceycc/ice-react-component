const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
module.exports = {
  mode: 'development',
  entry: './src/app.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    {
        test: /\.scss/,
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/,
        use: ['css-loader','sass-loader']
    },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
    }

    ]
  },
  devServer: {
    contentBase: './dist',
    port:'8090'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CheckerPlugin()
  ],
};
