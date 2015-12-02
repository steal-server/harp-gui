Harp GUI
========

Harp GUI is a cross-platform desktop app that lets you easily start a [Harp](http://harpjs.com/) server for local development. [Video of Harp GUI in action](https://www.youtube.com/watch?v=EsCQwyWNXS8).

![Start Screen](http://i.imgur.com/iE7Iidz.png)
![Server Running](http://i.imgur.com/0xumhhJ.png)

Installing
==========

Follow these steps to install Harp GUI.

Linux
-----

Run the following commands in your terminal:

    sudo apt-add-repository "deb https://packagecloud.io/alexgleason/harp-gui/debian/ jessie main"
    sudo apt-get update
    sudo apt-get install harp-gui

This will work with Ubuntu, Linux Mint, elementary OS, Debian, and any Debian-based system that uses apt-get.

Other Linux distributions may be supported in the future. In the meantime, you can run Harp GUI by following the steps in the Contributing section.

Mac
---
[Harp GUI 1.0.0rc1 64-bit](https://drive.google.com/folderview?id=0BwfNEizpnybJVTVGOHZ3eDR1Y2M&usp=sharing)

Windows
-------
TBD, desired but not yet planned.

Contributing
============

Harp GUI is written using web technologies and distributed with [Electron](http://electron.atom.io/docs/). To get up and running, ensure Node.js and npm are installed, then install Electron with:

    npm install electron-prebuilt -g

If you get errors, run the command with `sudo`.

The next part is a little tricky. You need to ensure that before you run the next command, you're using the same version of Node that Electron uses internally. To check that, scroll to the bottom of [electron.atom.io](http://electron.atom.io/) under the "Get started with Electron" section. Check your Node version with `node -v` and compare it to the website. If you're using a different major version, consider using [n](https://www.npmjs.com/package/n) or [nvm](https://github.com/creationix/nvm) to switch to Electron's version temporarily. Once that's settled, run:

    npm install

This installs the project dependencies. One of those, `node-sass`, needs to be compiled for your platform with the proper version of Node. This is why the previous step was needed, and you can now safely switch back to any version of Node.

Finally, run `electron .` in this directory to start the app.

Debugging
---------

Like Chrome, you can use the keyboard shortcut `shift + ctrl + I` to bring up an inspector.

You can use the javascript console to view errors and debug code. See the [Electron docs](http://electron.atom.io/docs/) for info about how Electron works.

License
=======

Copyright © 2015 Harp GUI Contributors

This software is licensed under GPLv3. See the `LICENSE` file for the complete license. Note that Harp is © Chloi Inc.

Other Notes
===========

Mockups provided by Teto Querini. View them [here](https://drive.google.com/folderview?id=0BwfNEizpnybJVGQ4T1UxMlIwQUU&usp=sharing).
