"use strict"
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode:'production',
  module:{
    rules:[
      {
        test:/\.(sass|scss)$/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader:'sass-loader',
            options:{
              implementation: require('dart-sass'),
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:'css/[name].[contenthash:8].css',
      chunkFilename:'css/[name].[contenthash:8].css'
    }),
    new CopyWebpackPlugin([
      {
        from:resolve('../public'),
        to:resolve('../dist')
      }
    ])
  ]
}