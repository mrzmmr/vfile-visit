# vfile-visit

> Convert vfile contents to vfiles and walk over nodes in contents

[![Travis](https://img.shields.io/travis/mrzmmr/vfile-visit.svg)](https://travis-ci.org/mrzmmr/vfile-visit)
[![Coveralls github](https://img.shields.io/coveralls/github/mrzmmr/vfile-visit.svg)](https://coveralls.io/github/mrzmmr/vfile-visit)

Converts vfile contents to vfiles if contents is an array. Optionally if a visitor function is supplied, then it will be called on each node in contents breadth first.

## install

```sh
npm i -S vfile-visit
```

## usage

```js
var visit = require('vfile-visit')
var vfile = require('vfile')

var foo = visit({
  path: 'foo',
  contents: [{
    path: 'bar',
    contents: 'bar'
  }]
})

console.log(foo)
```

Outputs:

```js
VFile {
  data: {},
  messages: [],
  history: ['foo'],
  cwd: './',
  contents: [
    VFile {
      data: {},
      messages: [],
      cwd: './',
      contents: 'bar'
    }
  ]
}
```

## api

### `read (file[, visitor])`

#### `file` (`VFile` | `Object`) - File or object to walk over
#### `visitor` (`Function?`) - Optional visitor to call while walking over nodes
#### Returns `VFile`

#### `visitor (current, parent, index)`
##### `current` (`VFile`) - current node
##### `parent` (`VFile`) - parent of current node
##### `index` (`Number`) - index of current in parent.contents
# vfile-read

> Read a file or directory into a vfile.

Read a file or directory into a [vfile](https://github.com/vfile/vfile) while keeping the directories structure using vfiles contents key. Vfile-read returns a promise if no callback is given.

## install

```sh
npm i vfile-read
```

## usage

Given:

```js
./foo
|_ bar
  |_ foo.txt
    |_ "Foo"
```

```js
var read = require('vfile-read')

read('./foo')
  .then(console.log)
  .catch(console.error)
```

Outputs:

```js
VFile {
  data: {},
  messages: [],
  history: ['foo'],
  cwd: './',
  contents: [
    VFile {
      data: {},
      messages: [],
      history: ["foo/bar"],
      cwd: "./",
      contents: [
        VFile {
          data: {},
          messages: [],
          history: ["foo/bar/foo.txt"],
          cwd: "./",
          contents: "Foo"
        }
      ]
    }
  ]
}
```

## api

### `read` (location[, options [, callback]])

</br>

#### `location`
***`string`*** - Location to read from.

</br>

#### `options`?
[ ***`string`*** | ***`array`*** | ***`object`*** ] - If options is a string then options.encoding is set to options. If options is an array then options.ignores is set to options.

##### `options.encoding`
***string*** - default = 'utf-8'

##### `options.ignores`
***array*** - default = []

</br>

#### `callback`?
***`function`*** - If no callback is given, then read returns a promise. 

</br>

### `read#sync`

Synchronous version of vfile-read

```js
var read = require('vfile-read')

try {
  var file = read.sync('./', {ignores: ['node_modules'])
  ...
} catch (err) {
  ...
}
```

Vfile-read uses fs.readdir and fs.readFile and options will be passed down to those functions.

## related

[to-vfile](https://github.com/vfile/to-vfile) - Create a vfile from a file-path

## License

MIT &copy; Paul Zimmer
