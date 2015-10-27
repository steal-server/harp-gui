(function() {

  var harp = require("harp");
  var path = require("path");
  var fs = require("fs");
  var remote = require("remote");
  var shell = remote.require("shell");
  var enableDestroy = require("server-destroy");

  var dialog = remote.require('dialog');
  var holder = document.getElementById('holder');
  var server = null;
  var appPath = '';
  var port = 0;

  function highlightLastPathDirectory(filename) {
    var i = filename.lastIndexOf(path.sep) + 1;
    var html = filename.substring(0, i);
    html += '<span class="highlighted">';
    html += filename.substring(i, filename.length);
    html += '</span>';
    return html;
  }

  function openAlert(title,description) {
    var popup = document.getElementById('alert-message');
    document.getElementById('alert-title').innerHTML =  title;
    document.getElementById('alert-description').innerHTML =  description;

    popup.classList.remove('close');
  }

  function closeAlert() {
    var popup = document.getElementById('alert-message');
    popup.classList.add('close');
  }

  function stopCompileLoading() {
    var folder = document.getElementById('server-status');
    folder.classList.remove('loading');
  }

  function startCompileLoading() {
    var folder = document.getElementById('server-status');
    folder.classList.add('loading');
  }

  function startAppServer(file) {
    appPath = path.resolve(process.cwd(), file || "");

    if (server !== null)
      server.destroy();
    harp.server(appPath, {
        ip: '0.0.0.0',
        port: port
      }, function() {
        server = this;
        enableDestroy(this);
        port = this.address().port;
        var url = "http://localhost:" + port + "/";
        document.getElementById('app-path').innerHTML = highlightLastPathDirectory(appPath);
        document.getElementById('launch').href = url;
        document.getElementById('server-url').innerHTML = '<a href="' + url + '">' + url + '</a>';
        document.body.className = 'server-on';
      });
  }

  holder.onclick = function() {
    dialog.showOpenDialog({
      title: 'Choose an app folder',
      properties: [ 'openDirectory' ]
    }, function(filepaths) {
      if (typeof filepaths == 'undefined') return;
      var file = filepaths[0];
      startAppServer(file);
    });
  }

  holder.ondragover = function() {
    this.className = 'hover';
    return false;
  };

  holder.ondragleave = holder.ondragend = function() {
    this.className = '';
    return false;
  };

  holder.ondrop = function(e) {
    this.className = '';
    e.preventDefault();
    var file = e.dataTransfer.files[0].path;
    if(!fs.lstatSync(file).isDirectory()) {
      openAlert("That won't work", "You dropped a file, but you must drop an app folder.")
      return false;
    }
    startAppServer(file);
    return false;
  };

  document.getElementById('build-app').onclick = function() {
    startCompileLoading();
    var outPath = path.resolve(appPath, '_build');
    harp.compile(appPath, outPath, function() {
      shell.openItem(outPath);
      stopCompileLoading();
    });
  }

}());
