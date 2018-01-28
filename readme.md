# vfile-visit

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
