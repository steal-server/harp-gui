(function() {

  var shell = require("remote").require("shell")

  /*
    All <a> links open in an external browser.
  */
  document.onclick = function(e) {
    e.preventDefault()
    if (e.target.tagName == 'A')
      shell.openExternal(e.target.href)
    return false
  };

  /*
    Dropping files into the app shouldn't set
    the URL to that file.
  */
  document.ondragover = document.ondrop = function(e) {
    e.preventDefault()
    return false
  };

}());
