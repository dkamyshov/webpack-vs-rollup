var name = 'WebpackVSRollup';
var cssClassName = '__[name]_[hash:hex:8]';
var getCssIdent = function(extract) {
  return extract ? 'extracted' : 'inlined';
};

var webpack = {
  formats: ['commonjs2', 'umd', 'amd'],
  modes: ['production', 'development'],
  extractCSS: [true, false],
  getCssIdent,
  cssClassName,
  name,
};

var rollup = {
  formats: ['cjs', 'umd', 'amd'],
  modes: [true, false],
  extractCSS: [true, false],
  getCssIdent,
  cssClassName,
  name,
};

module.exports = {
  webpack,
  rollup,
};
