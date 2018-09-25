var path = require('path');

var postcss = require('rollup-plugin-postcss');
var typescript = require('rollup-plugin-typescript');
var uglify = require('rollup-plugin-uglify');
var gzip = require('rollup-plugin-gzip');
var common = require('./common').rollup;
var cssnano = require('cssnano');

var getModeLabel = function(isProduction) {
  return isProduction ? 'production' : 'development';
};

var getConfig = function(format, isProduction, extract) {
  return {
    input: './src/index.ts',
    plugins: [
      postcss({
        modules: true,
        extract: extract
          ? path.resolve(__dirname, '../build/rollup/extracted/style.css')
          : void 0,
        namedExports: true,
        modules: {
          generateScopedName: '__[name]_[hash:hex:8]',
        },
      }),
      typescript(),
      ...(isProduction ? [uglify.uglify()] : []),
      gzip.default(),
    ],
    output: {
      file:
        'build/rollup/' +
        common.getCssIdent(extract) +
        '/' +
        format +
        '/' +
        getModeLabel(isProduction) +
        '.js',
      globals: {
        react: 'React',
      },
      sourcemap: true,
      name: common.name,
      format,
    },
    external: ['react'],
  };
};

var configs = [];

common.formats.forEach(format => {
  common.modes.forEach(mode => {
    common.extractCSS.forEach(extract => {
      configs.push(getConfig(format, mode, extract));
    });
  });
});

module.exports = configs;
