# Version tracking Bookmarklet

This repo allows users to personalize a JavaScript Bookmarklet for use in monitoring changes to websites through a web-based UI.

## Usage
Go to https://edgi-govdata-archiving.github.io/version-tracking-ui/ and follow the instructions.


## Development

* `npm install .`
* Edit `$scope.input` in [`browser-tool.js`](browser-tool.js). This will become the main content of the new bookmarklet.
* `npm run build`
* `open index.html`

Copyright (c) 2017 James McKinney, released under the MIT license
