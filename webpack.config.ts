import { resolve } from 'node:path';
import { Configuration, DefinePlugin } from 'webpack';

const NodemonWebpackPlugin = require('nodemon-webpack-plugin');

const webpackConfig: Configuration = {
  entry: './src/index.ts',
  mode: 'development',
  target: 'node',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new NodemonWebpackPlugin(),
    new DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
  })
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: [/\.ts?$/],
        loader: 'babel-loader'
      }
    ]
  }
}

export default webpackConfig;