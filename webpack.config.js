const ngToolsWebpack = require('@ngtools/webpack');
const path = require("path");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './app/main.jit.ts',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'app.main.js'
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: path.join(process.cwd(), "app/app.module#AppModule"),
      baseDir: process.cwd(),
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
