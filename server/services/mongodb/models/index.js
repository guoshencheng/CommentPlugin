var path = require('path');
var fs = require('fs');

var dir = path.resolve(__dirname, './')
var jsFileRegExp = /\.js$/
var files = fs.readdirSync(dir)

module.exports = files.filter(file => {
  return jsFileRegExp.test(file) && file != "index.js";
}).map(file => {
  var model = require('./' + file);
  return Object.assign({}, model, { __filename: file.replace(jsFileRegExp, '') })
})
