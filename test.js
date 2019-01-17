'use strict';

var test = require('tap').test;
var vfile = require('vfile');
var visit = require('./');

test('vfile-visit', function (t) {
  t.test('converts contents to vfile', function (st) {
    var foo = vfile({contents: [{path: 'bar', contents: ['hello']}]});
    foo = visit(foo);
    st.ok(foo.contents[0] instanceof vfile);
    st.ok(foo.contents[0].contents[0] instanceof vfile);
    st.end();
  });

  t.test('callback calls on un modified contents', function (st) {
    visit({contents: [{path: 'bar'}]}, function (c, p, i) {
      st.ok(c instanceof vfile);
      if (Array.isArray(c.contents)) {
        c.contents.forEach(function (cc) {
          st.ok(!(cc instanceof vfile));
        });
      }
    });
    st.end();
  });

  t.test('should be a copy of original file', function (st) {
    var foo = vfile({path: 'foo'})

    var bar = visit(foo, function (current) {
      current.path = 'bar'
    })

    st.notSame(foo, bar)
    st.ok(foo.path === 'foo')
    st.ok(bar.path === 'bar')
    st.end()
  })

  t.end();
});
