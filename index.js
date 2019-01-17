'use strict';

var vfile = require('vfile');
var clone = require('clone');

module.exports = visit;

function visit(file, callback) {
  var fn = callback || function () {};
  var root = vfile(clone(file));

  one(root);

  return root;

  function one(file, index, parent) {
    file = vfile(file);

    fn(file, index, parent);

    if (parent) {
      parent.contents[index] = file;
    }

    if (Array.isArray(file.contents)) {
      each(file);
    }
  }

  function each(file) {
    var index = -1;
    var sub;

    while (++index < file.contents.length) {
      sub = file.contents[index];
      one(sub, index, file);
    }
  }
}
