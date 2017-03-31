const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    Index: ['./src/script/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist/static/js'),
    publicPath: 'static/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.html', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          chunks: ['Index'],
          filename: '../../index.html',
          template: './src/tpl/index',
          inject: true
      })
  ]
}