# Mimoza

[![Build Status](https://secure.travis-ci.org/nodeca/mimoza.png?branch=master)](http://travis-ci.org/nodeca/mimoza)

Mimoza is a tiny but comprehensive MIME tools library. Features:

- Resolving mime type by file path/name/extention (with fallback
  for unknown cases).
- Finding file extention by mime type.
- Checking if mime type (or file) can be compressed.
- You can have multimple instances with different configs.
- Works in browser too (AMD module).

See detailed [API docs](http://nodeca.github.com/mimoza).

## Installation

for node.js:

```bash
npm install mimoza
```

for browser (AMD module):

```bash
bower install mimoza
```

## Example

``` javascript
var Mimoza = require('mimoza');

// Use builtin methods:

Mimoza.getExtension('audio/ogg');       // -> '.oga'

Mimoza.getMimeType('ogg');              // -> 'audio/ogg'
Mimoza.getMimeType('.oga');             // -> 'audio/ogg'
Mimoza.getMimeType('test.oga');         // -> 'audio/ogg'
Mimoza.getMimeType('foo/bar.oga');      // -> 'audio/ogg'

Mimoza.isCompressibleMimeType('text/html')                // -> true
Mimoza.isCompressibleMimeType('application/octet-stream') // -> false

Mimoza.isCompressibleExtention('txt')               // -> true
Mimoza.isCompressibleExtention('kittens/photo.jpg') // -> false


// Define your own instance

var mime = new Mimoza({
  defaultType: 'hard/core', // mime type for unknown extentions
  preloaded: true           // load default rules
});

// instances are customizeable
mime.register('foo/bar', ['baz', 'moo']);

mime.getExtension('foo/bar');           // -> '.baz'
mime.getMimeType('baz');                // -> 'foo/bar'
mime.getMimeType('moo');                // -> 'foo/bar'

// unknown file types, with default & custom fallback
mime.getMimeType('tada');               // -> 'hard/core'
mime.getMimeType('tada', 'soft/core');  // -> 'soft/core'
```
