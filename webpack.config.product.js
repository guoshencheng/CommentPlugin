var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = Object.assign({}, require('./webpack.config.js'));
webpackConfig.devtool = "";
webpackConfig.output.filename = "[name].[hash].js"
webpackConfig.plugins = [ 
  new ExtractTextPlugin("[name].[hash].css"),
  new webpack.optimize.UglifyJsPlugin()
]

module.exports = webpackConfig;



