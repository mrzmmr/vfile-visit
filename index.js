'use strict'

var vfile = require('vfile')

module.exports = visit

function visit (file, callback) {
  var root = vfile({contents: [file]})
  var list = [file, root]
  var i

  while (list.length > 0) {
    var current = list.shift()
    var parent = list.shift()

    var index = parent.contents.indexOf(current)

    if (!(current instanceof vfile)) {
      current = vfile(current)
    }

    parent.contents[index] = current

    if (typeof callback === 'function') {
      callback(current, parent, index)
    }

    if (Array.isArray(current.contents)) {
      i = -1
      while (i++ < current.contents.length - 1) {
        list.push(current.contents[i], current)
      }
    }
  }

  return root.contents[0]
}
