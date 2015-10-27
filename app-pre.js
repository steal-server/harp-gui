(function() {

  var shell = require("remote").require("shell");

  document.onclick = function(e) {
    e.preventDefault();
    if (e.target.tagName == 'A')
      shell.openExternal(e.target.href);
    return false;
  };

  document.ondragover = document.ondrop = function(e) {
    e.preventDefault();
    return false;
  };

}());
