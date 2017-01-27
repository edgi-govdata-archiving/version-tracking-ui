# EDGI Version Monitoring Bookmarklet

## Usage

Go to https://edgi-govdata-archiving.github.io/version-tracking-ui/ to get the bookmarklet.

Do you use this bookmarklet? Do you have an idea to make it better? [Share your feedback by creating an issue on GitHub.](https://github.com/edgi-govdata-archiving/version-tracking-ui/issues)

## Context

People are using a web UI to monitor changes to websites. They want to change the UI to reduce the number of steps needed to perform their tasks. Since we can't change the UI from the server side, we use a bookmarklet to change it from the client side.

## Development

* `npm install .`
* Edit [`browser-tool.js`](browser-tool.js)
* `npm run build`
* `open index.html`

Copyright (c) 2017 James McKinney, released under the MIT license
