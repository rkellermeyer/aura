/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/project_profiles              ->  index
 * POST    /api/project_profiles              ->  create
 * GET     /api/project_profiles/:id          ->  show
 * PUT     /api/project_profiles/:id          ->  update
 * DELETE  /api/project_profiles/:id          ->  destroy
 */

'use strict';

const _ = require('lodash');
const ProjectProfile = require('./project-profile.model');

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

// Gets a list of ProjectProfiles
function index(req, res) {
  return ProjectProfile.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ProjectProfile from the DB
function show(req, res) {
  return ProjectProfile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ProjectProfile in the DB
function create(req, res) {
  return ProjectProfile.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ProjectProfile in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return ProjectProfile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ProjectProfile from the DB
function destroy(req, res) {
  return ProjectProfile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
