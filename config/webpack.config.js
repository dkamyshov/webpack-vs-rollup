var path = require('path');
var ExtractCSSChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');

var name = 'WebpackVSRollup';
var formats = ['commonjs2', 'umd', 'amd'];
var modes = [
  {
    mode: 'production'
  },

  {
    mode: 'development',
    devtool: 'source-map'
  }
];

var getConfig = function(format, mode) {
  return {
    ...mode,
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'webpack/' + format + '/' + mode.mode + '.js',
      library: name,
      libraryTarget: format,
      globalObject: 'typeof self !== "undefined" ? self : this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader'
        },

        {
          test: /\.css$/,
          use: [
            ExtractCSSChunksWebpackPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '__[name]_[hash:hex:8]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractCSSChunksWebpackPlugin({
        filename: 'webpack/style.css'
      }),
      new CompressionWebpackPlugin({
        test: /\.(js|css)$/,
        minRatio: 0.8,
      })
    ],
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
        amd: 'react',
      }
    }
  }
}

var configs = [];

formats.forEach(function(format) {
  modes.forEach(function(mode) {
    configs.push(getConfig(format, mode));
  });
});

module.exports = configs;
