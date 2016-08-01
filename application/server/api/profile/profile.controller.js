/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/profiles              ->  index
 * POST    /api/profiles              ->  create
 * GET     /api/profiles/:id          ->  show
 * PUT     /api/profiles/:id          ->  update
 * DELETE  /api/profiles/:id          ->  destroy
 */

'use strict';

const _ = require('lodash');
const Profile require('./profile.model');

module.exports = {index, show, create, update, destroy};

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

// Gets a list of Profiles
function index(req, res) {
  return Profile.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Profile from the DB
function show(req, res) {
  return Profile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Profile in the DB
function create(req, res) {
  return Profile.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Profile in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Profile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Profile from the DB
function destroy(req, res) {
  return Profile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
