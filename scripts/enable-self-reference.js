var fs = require('fs');
var path = require('path');


// Add boomgate.js and boomgate.d.ts to our own node_modules folder, so it can require() itself (e.g. in tests).
fs.writeFileSync(path.join(__dirname, '../node_modules/boomgate.js'), `module.exports = require('..');`);
fs.writeFileSync(path.join(__dirname, '../node_modules/boomgate.d.ts'), `export * from '..';`);
