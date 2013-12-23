0.2.0 / WIP
-----------

- API change.
- Added `preloaded` option , to init instances with default mime rules.
- Removed `normalize` option.
- Changed `loadFile(name)` -> `loadMimes(String|Array)`.
- Added `loadCompressibles()`, `isCompressibleMimeType()` &
  `isCompressibleExtention()` methods.
- getExtention() now case insensitive.
- getMimeType() now accept typed mimes & mimes with charset.
- Sync node.types with nodeca-mime.
- Added tests.


0.1.1 / 2012-08-10
------------------

- Added 'Mozilla App manifest' mime type


0.1.0 / 2012-05-15
------------------

- First release
