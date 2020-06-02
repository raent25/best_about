const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");


const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
}

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: PATHS.dist,
      
    },
    plugins: [
        new HTMLPlugin({
          filename: 'index.html',
          template: './src/index.html',
          hash: false
        }),
        new MiniCssExtractPlugin({
          filename: 'style.css'
        }),
        new CopyWebpackPlugin([
          { from: PATHS.src + '/img', to: `img` },
          { from: PATHS.src + '/fonts', to: `fonts` },
        ]),
        new webpack.LoaderOptionsPlugin({
          options: {
              postcss: [
                  autoprefixer()
              ]
          }
      })
        
      ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader' ]
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /img/,
          use: [
            {
              loader: 'file-loader?name=./src/fonts/[name].[ext]',
              options: {
                name: "[name].[ext]",
                outputPath: "fonts",
            }
          }
          ]
         
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          exclude: /fonts/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: "img"
            
          }
        },

        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader',  'postcss-loader', 'resolve-url-loader', 'sass-loader']
        },
        { test: /\.js$/,
           exclude: /node_modules/,
           loader: "babel-loader" }
      ],
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 4200
    }
}