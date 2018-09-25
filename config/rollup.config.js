var path = require('path');

var postcss = require('rollup-plugin-postcss');
var typescript = require('rollup-plugin-typescript');
var uglify = require('rollup-plugin-uglify');
var gzip = require('rollup-plugin-gzip');
var cssnano = require('cssnano');

var name = 'WebpackVSRollup';
var formats = ['cjs', 'umd', 'amd'];
var modes = [true, false];

var getModeLabel = function(mode) {
  return mode ? 'production' : 'development';
}

var getConfig = function(format, isProduction) {
  return {
    input: './src/index.ts',
    plugins: [
      postcss({
        modules: true,
        extract: path.resolve(__dirname, '../build/rollup/style.css'),
        namedExports: true,
        modules: {
          generateScopedName: '__[name]_[hash:hex:8]',
        }
      }),
      typescript(),
      ...(isProduction ? [
        uglify.uglify()
      ] : []),
      gzip.default(),
    ],
    output: {
      file: 'build/rollup/' + format + '/' + getModeLabel(isProduction) + '.js',
      globals: {
        react: 'React'
      },
      sourcemap: true,
      format,
      name,
    },
    external: ['react']
  }
}

var configs = [];

formats.forEach(function(format) {
  modes.forEach(function(mode) {
    configs.push(getConfig(format, mode));
  });
});

module.exports = configs;
