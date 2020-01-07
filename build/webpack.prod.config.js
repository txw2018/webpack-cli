"use strict"
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //清除打包文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //提取css
const CopyWebpackPlugin = require('copy-webpack-plugin') //copy文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩css
module.exports = {
  mode:'production',
  output:{
    path:resolve('../dist'),
    filename:'bundle.[chunkhash:8].js'
  },
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
          {
            loader: 'postcss-loader'
          }
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
    ]),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp:/\.css$/g,
      cssProcessor:require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template:resolve('../public/index.html'),
      filename:'index.html',
      chunks:['index'],
      inject:true,
      minify:{
        html5:true,
        collapseWhitespace:true,
        preserveLineBreaks:false,
        minifyJS:true,
        minifyCSS:true,
        removeComments:false
      }
    })
  ]
}