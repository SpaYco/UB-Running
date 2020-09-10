// const merge = require('webpack-merge');
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import base from './base';

// const TerserPlugin = require('terser-webpack-plugin');
// const base = require('./base');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
