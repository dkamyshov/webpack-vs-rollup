# Webpack vs rollup bundle size comparison

1. `npm run build` - memory intensive, may consume up to 3 GB
2. `cd build`
3. `find . -type f -exec wc -c \{\} \;`
4. `cd ..`
5. `node csv.js > stat.csv`
6. Open `stat.csv` in your favorite editor.

One-liner: `npm run build && cd build && find . -type f -exec wc -c \{\} \; > ../list.txt && cd .. && node csv.js > stat.csv`

## Results

![Results](https://pp.userapi.com/c852036/v852036017/f2f4/1S2IaIkSps8.jpg)