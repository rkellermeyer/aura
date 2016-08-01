/**
 * Broadcast updates to client when the model changes
 */

'use strict';

const CategoryEvents = require('./category.events');

// Model events to emit
const events = ['save', 'remove'];

module.exports.register = function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('category:' + event, socket);

    CategoryEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    CategoryEvents.removeListener(event, listener);
  };
}
