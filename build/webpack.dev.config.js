"use strict"
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack')
module.exports = {
  mode:'development',
  output:{
    path:resolve('../dist'),
    filename:'bundle.js'
  },
  devServer:{
    contentBase:'../dist',
    hot:true
  },
  module:{
    rules:[
      {
        test:/\.(sass|scss)$/,
        use:[
          'style-loader',
          'css-loader',
          {
            loader:'sass-loader',
            options:{
              implementation: require('dart-sass'),
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template:resolve('../public/index.html')
    }),
    new HardSourceWebpackPlugin()
  ]
}