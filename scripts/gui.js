var path = require("path")

/*
  Takes a path name like `/home/me/myproject` and returns an HTML version
  where the last path segment is denoted for styling.
*/
function highlightLastPathDirectory(filename) {
  var i = filename.lastIndexOf(path.sep) + 1
  var html = '<small>'
  html += filename
  html += '</small>'
  html += '<h1 class="highlighted">'
  html += filename.substring(i, filename.length)
  html += '</h1>'
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
  }
  setTimeout(function() { document.getElementById('server-status').classList.remove('changefolder') }, 2000)
}

/*
  Called when the server is started.
*/
exports.serverStarted = function(server) {
  var url = "http://localhost:" + server.address().port + "/"
  document.getElementById('app-path').innerHTML = highlightLastPathDirectory(server.appPath)
  document.getElementById('infotitle').innerHTML = 'Your server is listening at'
  document.getElementById('launch').href = url
  document.getElementById('server-url').innerHTML = '<a href="' + url + '">' + url + '</a>'
  document.body.className = 'server-on'
}
