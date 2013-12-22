/*global describe, it*/


'use strict';


var eq      = require('assert').strictEqual;
var path    = require('path');

var Mimoza  = require('../lib/mimoza');


describe('defaults', function () {

  var m = Mimoza;


  it('resolve mime by file name', function () {
    eq('text/plain', m.getMimeType('text.txt'));
    eq('text/plain', m.getMimeType('teXt.TXT'));
    eq('text/plain', m.getMimeType('.text.txt'));
    eq('text/plain', m.getMimeType('dir/text.txt'));
    eq('text/plain', m.getMimeType('dir\\ext.txt'));
    eq('text/plain', m.getMimeType('txt'));
    //eq('text/plain', m.getMimeType('/txt'));
    //eq('text/plain', m.getMimeType('\\txt'));
  });


  it.skip('default mime for unknown extention', function () {
    eq('application/octet-stream', m.getMimeType('text.nope'));
  });


  it('mime fallback for unknown extention', function () {
    eq('fallback', m.getMimeType('text.fallback', 'fallback'));
  });


  it('resolve extention by mime', function() {
    eq('.txt', m.getExtension(m.getMimeType('text.txt')));
    eq('.html', m.getExtension(m.getMimeType('text.htm')));
    eq('.bin', m.getExtension('application/octet-stream'));
    eq('.bin', m.getExtension('application/octet-stream '));
    eq('.html', m.getExtension(' text/html; charset=UTF-8'));
    eq('.html', m.getExtension('text/html; charset=UTF-8 '));
    eq('.html', m.getExtension('text/html; charset=UTF-8'));
    eq('.html', m.getExtension('text/html ; charset=UTF-8'));
    eq('.html', m.getExtension('text/html;charset=UTF-8'));
    eq(undefined, m.getExtension('unrecognized'));
  });


  it('mimes are case sensitive', function() {
    eq('.html', m.getExtension('text/html'));
    eq(undefined, m.getExtension('text/Html'));
  });

});


describe('custom instance', function () {

  var m = new Mimoza({
    defaultType:  'hard/core',
    normalize:    function (ext) {
                    return '[' + ext.toLowerCase() + ']';
                  }
  });

  m.register('foo/bar', ['baz', 'moo']);


  it('custom extention normalizer', function () {
    eq('[baz]', m.getExtension('foo/bar'));
  });

  it('resolve registered', function () {
    //eq('foo/bar', m.getMimeType('.baz'));
    //eq('foo/bar', m.getMimeType('/.baz'));
    //eq('foo/bar', m.getMimeType('fee.baz'));
    //eq('foo/bar', m.getMimeType('foo/fee.baz'));
    //eq('foo/bar', m.getMimeType('foo\\fee.baz'));
    //eq('foo/bar', m.getMimeType('.baz'));
    eq('foo/bar', m.getMimeType('BaZ'));
    eq('foo/bar', m.getMimeType('moo'));
  });

  //mime.getMimeType('[baz]');              // -> 'foo/bar'

  it.skip('default mime for unknown extention', function () {
    eq('hard/core', m.getMimeType('tada'));
  });


  it('mime fallback for unknown extention', function () {
    eq('soft/core', m.getMimeType('text.fallback', 'soft/core'));
  });

});


describe('node.types check', function () {

  var m = Mimoza;

  it('check that some mimes loaded', function () {
    eq('font/opentype', m.getMimeType('file.otf'));
    eq('application/octet-stream', m.getMimeType('file.buffer'));
    eq('audio/mp4', m.getMimeType('file.m4a'));
  });

});


describe('integrity check', function () {

  it.skip('apache.types & note.types should not overlap', function () {
    var apacheTypes = new Mimoza()
      , nodeTypes = new Mimoza();

    apacheTypes.loadFile(path.join(__dirname, '../types/mime.types'));
    nodeTypes.loadFile(path.join(__dirname, '../types/node.types'));

    var keys = [].concat(Object.keys(apacheTypes.types))
                 .concat(Object.keys(nodeTypes.types));
    keys.sort();

    for (var i = 1; i < keys.length; i++) {
      if (keys[i] === keys[i-1]) {
        console.warn('Warning: ' +
          'node.types defines ' + keys[i] + '->' + nodeTypes.types[keys[i]] +
          ', mime.types defines ' + keys[i] + '->' + apacheTypes.types[keys[i]]);
      }
    }
  });

});
