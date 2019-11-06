"use strict"
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack')
module.exports = {
  mode:'development',
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
    new webpack.HotModuleReplacementPlugin()
  ]
}