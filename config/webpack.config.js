var path = require('path');
var common = require('./common').webpack;
var ExtractCSSChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');

var getCssIdent = function(extract) {
  return extract ? 'extracted' : 'inlined';
};

var getConfig = function(format, mode, extract) {
  return {
    mode,
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename:
        'webpack/' + getCssIdent(extract) + '/' + format + '/' + mode + '.js',
      library: common.name,
      libraryTarget: format,
      globalObject: 'typeof self !== "undefined" ? self : this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader',
        },

        {
          test: /\.css$/,
          use: [
            extract ? ExtractCSSChunksWebpackPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: common.cssClassName,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      ...(extract
        ? [
            new ExtractCSSChunksWebpackPlugin({
              filename: 'webpack/' + getCssIdent(extract) + '/style.css',
            }),
          ]
        : []),
      new CompressionWebpackPlugin({
        test: /\.(js|css)$/,
        minRatio: 0.8,
      }),
    ],
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
        amd: 'react',
      },
    },
  };
};

var configs = [];

common.extractCSS.forEach(extract => {
  common.formats.forEach(format => {
    common.modes.forEach(mode => {
      configs.push(getConfig(format, mode, extract));
    });
  });
});

module.exports = configs;
