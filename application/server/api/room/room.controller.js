/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rooms              ->  index
 * POST    /api/rooms              ->  create
 * GET     /api/rooms/:id          ->  show
 * PUT     /api/rooms/:id          ->  update
 * DELETE  /api/rooms/:id          ->  destroy
 */

'use strict';

const _ = require('lodash');
const Room = require('./room.model');
const User = require('../user/user.model');

module.exports = {index, show, create, update, destroy, destroyMessage};

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Rooms
function index(req, res) {
  return Room.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Room from the DB
function show(req, res) {
  return Room.findById(req.params.id).populate('creator users').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Room in the DB
function create(req, res) {
  return Room.create(req.body)
    .then(attachUser)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));

  function attachUser(room) {
    room.creator = req.user._id;
    room.users.push(req.user._id);
    room.save();
    req.user.rooms.push(room._id);
    req.user.save();
    return room;
  }
}

// Updates an existing Room in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  const requsers = req.body.users;
  delete req.body.users;

  return Room.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(entity => {
      const promises = requsers.map(userId => {
        return User.findById(userId).exec().then((user => {
          const index = user.rooms.indexOf(entity._id);
          if (index === -1) {
            user.rooms.push(entity._id);
            entity.users.push(user._id);
            user.save();
            entity.save()
          }
          return Promise.resolve();
        }))
      })
      return Promise.all(promises).then(()=> entity);
    })
    .then(entity => {
      console.log(entity)
      return entity
    })
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Room from the DB
function destroy(req, res)
{
  return Room.findById(req.params.id).populate('users').exec()
    .then((entity)=> {
      let index = req.user.rooms.indexOf(entity._id)
      if (~index) {
        req.user.rooms.splice(index, 1);
        req.user.save();
      }
      entity.users.forEach(user => {
        const index = user.rooms.indexOf(entity._id);
        if (~index) {
          user.rooms.splice(index, 1);
          user.save();
        }
      })
      return entity;
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function destroyMessage(req, res) {
  const messageId = req.params.messageId;
  return Room.findById(req.params.id).populate('users').exec()
    .then(handleEntityNotFound(res))
    .then((entity)=> {
      entity.messages.id(messageId).remove();
      entity.save();
      console.log(entity);
      return entity;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
