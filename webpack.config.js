const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/App.jsx', 'webpack-hot-middleware/client', 'react-hot-loader/patch'],
    welcome: ['./src/views/Welcome/Welcome.jsx', 'webpack-hot-middleware/client',],
    profile: ['./src/views/Profile/Profile.jsx', 'webpack-hot-middleware/client'],
    vendor: ['react', 'react-dom', 'react-router'],
  }
  ,
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Cryptory',
      template: '!!raw-loader!./views/home.ejs'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx']
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  mode: 'development',
  stats: {
    colors: true
  },
};
