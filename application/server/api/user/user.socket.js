/**
 * Broadcast updates to client when the model changes
 */

'use strict';
const _ = require('lodash');
const UserEvents = require('./user.events');
const User = require('./user.model');
const UserProfile = require('../user-profile/user-profile.model');

// Model events to emit
var events = ['save', 'remove'];

module.exports.register = function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('user:' + event, socket);

    UserEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }

  socket.on('user:update', doc => {
    if (!doc._id) return;
    User.findById(doc._id).then(user => {
      UserProfile.findById(doc.user_profile._id).then(profile => {
        const newProfile = _.merge(profile, doc.user_profile);
        newProfile.save().then(()=> {
          console.log(newProfile.first_name);
        })
      })
    })
  })
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    UserEvents.removeListener(event, listener);
  };
}
