/**
 * Status model events
 */

'use strict';

const EventEmitter = require('events');
const Status = require('./status.model');
const StatusEvents = new EventEmitter();


// Set max event listeners (0 == unlimited)
StatusEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Status.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StatusEvents.emit(event + ':' + doc._id, doc);
    StatusEvents.emit(event, doc);
  }
}

module.exports = StatusEvents;
