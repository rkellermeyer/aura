/**
 * Category model events
 */

'use strict';

const EventEmitter = require('events');
const Category = require('./category.model');
const CategoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CategoryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Category.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CategoryEvents.emit(event + ':' + doc._id, doc);
    CategoryEvents.emit(event, doc);
  }
}

module.exports = CategoryEvents;
