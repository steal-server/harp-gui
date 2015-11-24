(function() {

  var harp = require("harp")
  var path = require("path")
  var fs = require("fs")
  var remote = require("remote")
  var shell = remote.require("shell")
  var enableDestroy = require("server-destroy")
  var dialog = remote.require("dialog")
  var wave = require("../scripts/wave.js")
  var gui = require("../scripts/gui.js")

  var holder = document.getElementById("splashscreen")
  var holderfolder = document.getElementById('holder')

  var server

  wave.CreateWave()
  /*
    Starts a new Harp server for the given app path.
  */
  function startAppServer(file) {
    // Set app path
    var appPath = path.resolve(process.cwd(), file || "")

    // GUI response
    gui.changeFolder()

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
        gui.serverStarted(server)
        wave.StartWave()
      })
  }

  holderfolder.onclick = function() {
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
    wave.StopWave()
    return false
  }

  holder.ondragleave = holder.ondragend = function() {
    this.className = ''
    wave.StartWave()
    return false
  }

  holder.ondrop = function(e) {
    wave.StopWave()
    this.className = ''
    e.preventDefault()
    var file = e.dataTransfer.files[0].path
    if(!fs.lstatSync(file).isDirectory()) {
      gui.openAlert("That won't work", "You dropped a file, but you must drop an app folder.")
      return false
    }
    startAppServer(file)
    return false
  }

  document.getElementById('build-app').onclick = function() {
    gui.startCompileLoading()
    var outPath = path.resolve(server.appPath, '_build')
    harp.compile(server.appPath, outPath, function() {
      shell.openItem(outPath)
      gui.stopCompileLoading()
    })
  }

  document.getElementById('alert-message').onclick = function() {
    gui.closeAlert()
  }

}())
