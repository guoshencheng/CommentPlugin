var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "mhc-comment": path.resolve(__dirname, './component/index.jsx')
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, './component/dist/'),
    filename: "[name].js",
    publicPath: "/dist/"
  },
  externals:{
    react: "React",
    "react-dom": "ReactDOM"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader"]
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"]
        })
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map'
}
