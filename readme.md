# cloze.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

cloze.js is a tiny, dependency free, javascript library that detects when a user is viewing your website. It supports all major browsers and tries its best to accomodate older ones.

[See it in action here.](https://sunrick.github.io/cloze/)

### Why?

* Stop/resume performance heavy JS when user is no longer viewing your site.
* Stop/resume playing video or audio.
* Track user behavior (be a spy).
* Send awkward welcome back prompts to your user.
* Probably other creative stuff.

### How to use?

Download either `cloze.js` or `cloze.min.js` from the latest release/master branch.

Include it in your html.

```
<script src="path_to/cloze.min.js"></script>
```

Initialize it whenever you are ready and then capture visibility changes by adding event listeners for `cloze:hidden` and `cloze:visible`.

jQuery.

```javascript
<script>
  $(document).ready(function(){
    Cloze.init();

    $(document).on("cloze:hidden", function(){
      mySiteJustBecameHidden();
    });

    $(document).on("cloze:visible", function(){
      mySiteJustBecameVisible();
    });

  });
</script>
```

Plain ole javascript.

```javascript
<body>
  <rest of html>
  <script>
    Cloze.init();

    document.addEventListener("cloze:hidden", function(){
      console.log("screw you for leaving");
    });
  </script>
</body>
```
Fancy "new" javascript. (IE 9+)

```javascript
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    Cloze.init();
    // same as others.
  });
</script>
```

## Supported Events

Please note that the initial page load does not trigger a visible state.

### Desktop

#### Detects

* Changing browser tabs to and from your website.
* Minimizing and opening the browser window back to your website.

#### Does not detect

* Changing from browser to another program.
* Another program blocking view of browser window.

### Mobile

#### Detects

* Changing browser tabs to and from your website.
* Changing from browser to another app.
* Locking to home screen from browser and from lock screen to browser.

## How does it work?

It uses the [Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to detect visibility state changes of the browser.

* Uses prefixes for cross browser support.
* Supports older browsers by using variations of `focus` and `blur` events. Check the code for more information.

## Contributing

### Thanks to these resources

[Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

[Joe Marini's blog post](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

[Andy Earnshaw's stackoverflow answer](http://stackoverflow.com/a/1060034)

### How to contribute

Feel free to submit a pull request or open up an issue!

To create cloze.min.js, first install:

`npm install uglify-js -g`

Then run:

`uglifyjs cloze.js  --compress --mangle --output cloze.min.js`
