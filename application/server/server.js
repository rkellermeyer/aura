/**
 * Server class
 */
'use strict';


const http     = require('http');
const express  = require('express');
const socketio = require('socket.io');

class Server {

  constructor(settings) {
    this.settings = settings;
    this.config   = settings.config;
    this.initialize(this.config, this.settings)
  }

  initialize(config, settings) {
    this.app  = express();
    this.http = http.createServer(this.app);
    this.io   = socketio(this.http, settings.socketio);
    this.start = this.start.bind(this, this.app, this.http, config);


    require('./web-sockets')(this.io);
    require('./middleware')(this.app);
    require('./routes')(this.app);
  }

  start(app, http, config) {
    app.startup = http.listen(config.port, ()=> {
      console.log(http.address());
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
  }
}


module.exports = Server;
