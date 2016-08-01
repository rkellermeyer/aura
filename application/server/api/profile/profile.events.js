/**
 * Profile model events
 */

'use strict';

const EventEmitter = require('events');
const Profile = require('./profile.model');
const ProfileEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProfileEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Profile.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProfileEvents.emit(event + ':' + doc._id, doc);
    ProfileEvents.emit(event, doc);
  }
}

module.exports = ProfileEvents;
