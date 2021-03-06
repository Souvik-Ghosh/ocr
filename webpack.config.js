const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true,
    inline: true,
  },
  entry: {
    index: './src/index.js'
  },
  mode: "production",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/, 
        use: [
          'html-loader', 
          'pug-html-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: [
          'file-loader',
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css"
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
      chunks: ['index']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}