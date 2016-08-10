/**
 * Socket.io configuration
 */
'use strict';

const config = require('./config/environment');
const socketioJwt = require('socketio-jwt');

// When the user disconnects.. perform this
function onDisconnect(socket) {

}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  // require('./api/category/category.socket').register(socket);
  // require('./api/project/project.socket').register(socket);
  require('./api/project-profile/project-profile.socket').register(socket);
  require('./api/user/user.socket').register(socket);
  // require('./api/profile/profile.socket').register(socket);
  // require('./api/thing/thing.socket').register(socket);
}

function webSockets(sio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:

  sio.set('authorization', socketioJwt.authorize({
    secret: config.secrets.session,
    handshake: true
  }))

  sio.on('connection', function(socket) {

    const decodeToken = JSON.stringify(socket.decoded_token)

    console.log(decodeToken, 'connected');

    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}

module.exports = webSockets;
