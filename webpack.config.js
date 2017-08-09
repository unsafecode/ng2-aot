const ngToolsWebpack = require('@ngtools/webpack');
const path = require("path");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './app/main.jit.ts',
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.aot.json'
    })
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: ['@ngtools/webpack'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
