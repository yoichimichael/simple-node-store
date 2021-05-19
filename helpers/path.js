const path = require('path');
console.log(module === require.main);
module.exports = path.dirname(require.main.filename);