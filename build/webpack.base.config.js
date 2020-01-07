"use strict"
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry:resolve('../src/index.js'),
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.tsx', '.scss']
  },
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include:[resolve('src')],
        use: {
          loader: 'babel-loader?cacheDirectory=true', //缓存，加快打包时间
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use:{
          loader:'url-loader',
          options:{
            limit: 8192,
            fallback:{
              loader:'file-loader',
              options:{
                name:'img/[name].[ext]?v=[hash:8]'
              }
            }
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:4096,
              fallback:{
                loader:'file-loader',
                options:{
                  name:'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:4096,
              fallback:{
                loader:'file-loader',
                options:{
                  loader:'file-loader',
                  options:{
                    name:'fonts/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins:[
  
  ]
  
}