(function() {

  var harp = require("harp")
  var path = require("path")
  var fs = require("fs")
  var remote = require("remote")
  var shell = remote.require("shell")
  var enableDestroy = require("server-destroy")
  var dialog = remote.require("dialog")

  var holder = document.getElementById("holder")

  var server

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
    // Set app path
    var appPath = path.resolve(process.cwd(), file || "")

    // GUI response
    if (document.getElementById('app-path').innerHTML != '')
      document.getElementById('server-status').classList.add('changefolder')
    document.getElementById('bluline').classList.add('hide')
    setTimeout(function() { document.getElementById('server-status').classList.remove('changefolder') }, 2000)
    setTimeout(function() { document.getElementById('bluline').classList.remove('hide') }, 3000)

    // Handle the server if it already exists
    var port = 0
    if (server !== undefined) {
      port = server.address().port
      server.destroy()
    }

    // Start server
    harp.server(appPath, {
        ip: '0.0.0.0',
        port: port
      }, function() {
        server = this
        server.appPath = appPath
        enableDestroy(server)
        var url = "http://localhost:" + server.address().port + "/"
        document.getElementById('app-path').innerHTML = highlightLastPathDirectory(server.appPath)
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
    var outPath = path.resolve(server.appPath, '_build')
    harp.compile(server.appPath, outPath, function() {
      shell.openItem(outPath)
      stopCompileLoading()
    })
  }

  document.getElementById('alert-message').onclick = function() {
    closeAlert()
  }

}())
