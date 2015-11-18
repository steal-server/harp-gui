var path = require("path")

/*
  Takes a path name like `/home/me/myproject` and returns an HTML version
  where the last path segment is denoted for styling.
*/
function highlightLastPathDirectory(filename) {
  var i = filename.lastIndexOf(path.sep) + 1
  var html = filename.substring(0, i)
  html += '<span class="highlighted">'
  html += filename.substring(i, filename.length)
  html += '</span>'
  return html
}

/*
  Spawns a global app alert that covers the whole screen and prevents
  other actions until it's closed.
*/
exports.openAlert = function(title, description) {
  var popup = document.getElementById('alert-message')
  document.getElementById('alert-title').innerHTML =  title
  document.getElementById('alert-description').innerHTML =  description

  popup.classList.remove('close')
}

/*
  Closes an open alert.
*/
exports.closeAlert = function() {
  var popup = document.getElementById('alert-message')
  popup.classList.add('close')
}

/*
  Called when an app starts compiling.
*/
exports.startCompileLoading = function() {
  var folder = document.getElementById('server-status')
  folder.classList.add('loading')
}

/*
  Called when an app finishes compiling.
*/
exports.stopCompileLoading = function() {
  var folder = document.getElementById('server-status')
  folder.classList.remove('loading')
}

/*
  Called when an app path is set or changed.
*/
exports.changeFolder = function() {
  if (document.getElementById('app-path').innerHTML != '') {
    document.getElementById('server-status').classList.add('changefolder')
    document.getElementById('bluline').classList.add('hide')
  }
  setTimeout(function() { document.getElementById('server-status').classList.remove('changefolder') }, 2000)
  setTimeout(function() { document.getElementById('bluline').classList.remove('hide') }, 3000)
}

/*
  Called when the server is started.
*/
exports.serverStarted = function(server) {
  var url = "http://localhost:" + server.address().port + "/"
  document.getElementById('app-path').innerHTML = highlightLastPathDirectory(server.appPath)
  document.getElementById('launch').href = url
  document.getElementById('server-url').innerHTML = '<a href="' + url + '">' + url + '</a>'
  document.body.className = 'server-on'
}
