const fs = require('fs');
const results = [];
const lines = fs.readFileSync('list.txt').toString().split('\n');

lines.forEach(line => {
  const data = line.match(/^(\d+)\s\.\/(.+)\/(.+)\/(.+)\/(.+)\.js(\.gz)?$/);
  if(data !== null) {
    results.push({
      size: Number(data[1]),
      bundler: data[2],
      css: data[3],
      module: data[4],
      mode: data[5],
      format: data[6] === '.gz' ? 'gzip' : 'plain'
    });
  }
});

console.log('bundler,css,module,mode,format,size');

results.forEach(result => {
  console.log(`${result.bundler},${result.css},${result.module},${result.mode},${result.format},${result.size}`);
});