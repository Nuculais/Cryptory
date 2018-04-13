const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/index.jsx', 'webpack-hot-middleware/client', 'react-hot-loader/patch'],
    // profile: ['./views/profile.js','webpack-hot-middleware/client',  'react-hot-loader/patch'],
    // misc: ['./views/misc.js','webpack-hot-middleware/client',  'react-hot-loader/patch']
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: '!!raw-loader!./views/home.ejs'
       // template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: /src/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['env', 'react'],
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  mode: 'development',
  stats: {
    colors: true
  },
};
