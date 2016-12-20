/* @license cloze.js https://github.com/sunrick/cloze Rickard Sundén MIT License */

"use strict";

Cloze = (function(){

  var hidden, blurEvents, hiddenEvent, visibleEvent;

  function init() {
    // initialize default values
    hidden = hiddenProp();
    blurEvents = ["blur", "focusout", "pagehide"];

    addListeners();

    // create hidden event
    hiddenEvent = document.createEvent('Event');
    hiddenEvent.initEvent('cloze:hidden', true, true);

    // create visible event
    visibleEvent = document.createEvent('Event');
    visibleEvent.initEvent('cloze:visible', true, true);
  }

  function hiddenProp() {
    var prefixes = ['webkit','moz','ms','o'];

    // if 'hidden' is natively supported just return it
    if ('hidden' in document) {
      return 'hidden';
    }

    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
      if ((prefixes[i] + 'Hidden') in document) {
        return prefixes[i] + 'Hidden';
      }
    }

    // not supported
    return null;
  }

  function addListeners() {
    if(hidden !== null) {
      var eventName = hidden.replace(/[H|h]idden/,'') + 'visibilitychange';
      document.addEventListener(eventName, onChange);
    }
    // IE 9 and lower:
    else if("onfocusin" in document) {
      document.onfocusin = document.onfocusout = onChange;
    }
    // All others:
    else {
      window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onChange;
    }
  }

  function onChange (event) {
    if (event.type in blurEvents || document[hidden]) {
      document.dispatchEvent(hiddenEvent);
    }
    else {
      document.dispatchEvent(visibleEvent);
    }
  }

  return {
    init: init
  }

})();




