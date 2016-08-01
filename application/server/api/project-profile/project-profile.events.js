/**
 * ProjectProfile model events
 */

'use strict';

const EventEmitter = require('events');
const ProjectProfile = require('./project-profile.model');
const ProjectProfileEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProjectProfileEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ProjectProfile.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProjectProfileEvents.emit(event + ':' + doc._id, doc);
    ProjectProfileEvents.emit(event, doc);
  }
}

module.exports = ProjectProfileEvents;
