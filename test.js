/**
 * Usage: node test.js
 */

var mime = require('./lib/mimoza');
var assert = require('assert');

function eq(a, b) {
  console.log('Test: ' + a + ' === ' + b);
  assert.strictEqual.apply(null, arguments);
}

//
// Test mime getMimeTypes
//

eq('text/plain', mime.getMimeType('text.txt'));
eq('text/plain', mime.getMimeType('.text.txt'));
eq('text/plain', mime.getMimeType('.txt'));
eq('text/plain', mime.getMimeType('txt'));
eq('application/octet-stream', mime.getMimeType('text.nope'));
eq('fallback', mime.getMimeType('text.fallback', 'fallback'));
eq('application/octet-stream', mime.getMimeType('constructor'));
eq('text/plain', mime.getMimeType('TEXT.TXT'));
eq('text/event-stream', mime.getMimeType('text/event-stream'));

//
// Test getExtensions
//

eq('.html', mime.getExtension(mime.getMimeType('htm')));
eq('.bin', mime.getExtension('application/octet-stream'));
eq(undefined, mime.getExtension('constructor'));

//
// Test node types
//

eq('application/octet-stream', mime.getMimeType('file.buffer'));
eq('audio/mp4', mime.getMimeType('file.m4a'));

console.log('\nOK');
