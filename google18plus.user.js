// ==UserScript==
// @name Google18+
// @author mattn
// @version Wed, 06 Jul 2011
// @namespace https://github.com/mattn/google18plus
// @description make small image for someone's post.
// @include https://plus.google.com/*
// @match https://plus.google.com/*
// ==/UserScript==

(function() {
  var list = [
    // 文字列でユーザ名とか、キーワーになる様な物を入れてね
  ]
  function is18plus(elem) {
    var texts = elem.innerHTML.split(/<[^>]+>/g);
    for (var n = 0; n < texts.length; n++) {
      for (var m = 0; m < list.length; m++) {
        if (list[m] == texts[n]) return true;
      }
    }
    return false;
  }

  function hasClass(elem, clazz) {
    var zz = elem.className.split(/\s+/g);
    for (var m = 0; m < zz.length; m++) {
      if (zz[m] == clazz) return true;
    }
    return false;
  }

  function check() {
    [].forEach.call(document.getElementsByTagName('div'), function(e) {
      if (e.id.substring(0, 7) != 'update-') return;
      if (hasClass(e, 'google18plus')) return;
      if (!is18plus(e)) return;
      [].forEach.call(e.getElementsByTagName('img'),
        function(n) { if (n.naturalWidth > 100) n.width = 16 });
      e.className += ' google18plus';
    })
  }
  window.setInterval(check, 1000);
})()
