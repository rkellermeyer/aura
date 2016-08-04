/**
 * Broadcast updates to client when the model changes
 */

'use strict';
const ProjectProfileEvents = require('./project-profile.events');
const ProjectProfile = require('./project-profile.model');
const ProjectPoint   = require('./point.model').Model;

const _ = require('lodash');
// Model events to emit
var events = ['save', 'remove'];
const mergeKeys = ['title', 'teaser', 'overview', 'points', 'archivedPoints'];

function mergeProject(project, doc) {
  const props = {};
  mergeKeys.forEach(key => {
    props[key] = doc[key];
  })
  return _.merge(project, props);
}

module.exports.register = function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('projectProfile:' + event, socket);

    ProjectProfileEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }

  socket.on('project-profile:update', doc => {
    console.log(doc._id);
    if (!doc._id) return;
    ProjectProfile.findById(doc._id)
      .exec()
      .then(projectProfile => {
        projectProfile = mergeProject(projectProfile, doc);
        projectProfile.save().then(()=> {
          console.log('Project Profile Updated')
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
    ProjectProfileEvents.removeListener(event, listener);
  };
}
