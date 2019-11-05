"use strict"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry:resolve('../src/index.js'),
  output:{
    path:resolve('../dist'),
    filename:'bundle.js'
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.tsx', '.scss']
  },
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.scss$/,
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
      },
      {
        test:/\.(png|jeg|jpeg|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            limit: 8192,
            fallback:'file-loader'
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:resolve('../src/public/index.html')
    })
  ]
  
}