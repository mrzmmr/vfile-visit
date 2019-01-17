'use strict';

var test = require('tap').test;
var vfile = require('vfile');
var visit = require('.');

test('vfile-visit', t => {
  t.test('converts contents to vfile', st => {
    var foo = vfile({contents: [{path: 'bar', contents: ['hello']}]});
    foo = visit(foo);
    st.ok(foo.contents[0] instanceof vfile);
    st.ok(foo.contents[0].contents[0] instanceof vfile);
    st.end();
  });

  t.test('callback calls on un modified contents', st => {
    visit({contents: [{path: 'bar'}]}, c => {
      st.ok(c instanceof vfile);
      if (Array.isArray(c.contents)) {
        c.contents.forEach(cc => {
          st.ok(!(cc instanceof vfile));
        });
      }
    });
    st.end();
  });

  t.test('should be a copy of original file', st => {
    var foo = vfile({path: 'foo'});

    var bar = visit(foo, current => {
      current.path = 'bar';
    });

    st.notSame(foo, bar);
    st.ok(foo.path === 'foo');
    st.ok(bar.path === 'bar');
    st.end();
  });

  t.end();
});
