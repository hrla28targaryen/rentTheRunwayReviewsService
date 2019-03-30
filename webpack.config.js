const webpack = require('webpack');
const path = require('path');
const combinedLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: __dirname + '/client/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loader: combinedLoaders([
         {
           loader: 'style-loader'
         }, {
           loader: 'css-loader',
           query: {
             modules: true,
             localIdentName: '[name]__[loader]__[hash:base64:5]'
           }
         }, {
           loader : 'sass-loader'
         }
        ])
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=1000',
        options: {
          fallback: 'file-loader'
        }
      },
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};