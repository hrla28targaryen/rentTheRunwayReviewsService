const webpack = require('webpack');
const path = require('path');
const combinedLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: __dirname + '/client/index.jsx',
  // entry: {
  //   main: path.join(__dirname, 'client/index.jsx'),
  //   FilterSearch: path.join(__dirname, 'client/components/FilterSearch/FilterSearch.jsx'),
  //   Reviews: path.join(__dirname, 'client/components/Reviews/Reviews.jsx'),
  //   ReviewList: path.join(__dirname, 'client/components/ReviewList/ReviewList.jsx'),
  //   ReviewListEntry: path.join(__dirname, 'client/components/ReviewListEntry/ReviewListEntry.jsx'),
  //   Pagination: path.join(__dirname, 'client/components/Pagination/Pagination.jsx'),
  //   ImageCarousel: path.join(__dirname, 'client/components/ImageCarousel/ImageCarousel.jsx'),
  //   Footer: path.join(__dirname, 'client/components/Footer/Footer.jsx'),
  //   StarRating: path.join(__dirname, 'client/components/StarRating/StarRating.jsx'),
  //   Summary: path.join(__dirname, 'client/components/Summary/Summary.jsx'),
  //   HOC: path.join(__dirname, 'client/components/HOC.jsx')
  // },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   },
  // },
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
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
   ] 
};