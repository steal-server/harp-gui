(function() {

  var harp = require("harp")
  var path = require("path")
  var fs = require("fs")
  var remote = require("remote")
  var shell = remote.require("shell")
  var enableDestroy = require("server-destroy")

  var dialog = remote.require('dialog')
  var holder = document.getElementById('holder')
  var server = null
  var appPath = ''
  var port = 0

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
  function openAlert(title, description) {
    var popup = document.getElementById('alert-message')
    document.getElementById('alert-title').innerHTML =  title
    document.getElementById('alert-description').innerHTML =  description

    popup.classList.remove('close')
  }

  /*
    Closes an open alert.
  */
  function closeAlert() {
    var popup = document.getElementById('alert-message')
    popup.classList.add('close')
  }

  /*
    Called when an app starts compiling.
  */
  function startCompileLoading() {
    var folder = document.getElementById('server-status')
    folder.classList.add('loading')
  }

  /*
    Called when an app finishes compiling.
  */
  function stopCompileLoading() {
    var folder = document.getElementById('server-status')
    folder.classList.remove('loading')
  }

  /*
    Starts a new Harp server for the given app path.
  */
  function startAppServer(file) {
    appPath = path.resolve(process.cwd(), file || "")
    if (document.getElementById('app-path').innerHTML != ''){
      document.getElementById('server-status').classList.add('changefolder')
    }
    document.getElementById('bluline').classList.add('hide')
    setTimeout(function(){ document.getElementById('server-status').classList.remove('changefolder') }, 2000)
    setTimeout(function(){ document.getElementById('bluline').classList.remove('hide') }, 3000)
    if (server !== null)
      server.destroy()
    harp.server(appPath, {
        ip: '0.0.0.0',
        port: port
      }, function() {
        server = this
        enableDestroy(this)
        port = this.address().port
        var url = "http://localhost:" + port + "/"
        document.getElementById('app-path').innerHTML = highlightLastPathDirectory(appPath)
        document.getElementById('launch').href = url
        document.getElementById('server-url').innerHTML = '<a href="' + url + '">' + url + '</a>'
        document.body.className = 'server-on'
      })
  }

  holder.onclick = function() {
    dialog.showOpenDialog({
      title: 'Choose an app folder',
      properties: [ 'openDirectory' ]
    }, function(filepaths) {
      if (typeof filepaths == 'undefined') return
      var file = filepaths[0]
      startAppServer(file)
    })
  }

  holder.ondragover = function() {
    this.className = 'hover'
    return false
  }

  holder.ondragleave = holder.ondragend = function() {
    this.className = ''
    return false
  }

  holder.ondrop = function(e) {
    this.className = ''
    e.preventDefault()
    var file = e.dataTransfer.files[0].path
    if(!fs.lstatSync(file).isDirectory()) {
      openAlert("That won't work", "You dropped a file, but you must drop an app folder.")
      return false
    }
    startAppServer(file)
    return false
  }

  document.getElementById('build-app').onclick = function() {
    startCompileLoading()
    var outPath = path.resolve(appPath, '_build')
    harp.compile(appPath, outPath, function() {
      shell.openItem(outPath)
      stopCompileLoading()
    })
  }

  document.getElementById('alert-message').onclick = function() {
    closeAlert()
  }

}())
