var name = 'WebpackVSRollup';
var cssClassName = '__[name]_[hash:hex:8]';
var getCssIdent = function(extract) {
  return extract ? 'extracted' : 'inlined';
};

// 24 parallel builds cause node to exit with `js heap out of memory` error
var webpack = {
  formats: ['commonjs2', 'umd', 'amd', 'var', 'this', 'window'],
  modes: ['production', 'development'],
  extractCSS: [true, false],
  getCssIdent,
  cssClassName,
  name,
};

var rollup = {
  formats: ['cjs', 'umd', 'amd', 'system', 'iife'],
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
