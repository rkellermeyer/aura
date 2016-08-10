/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/requests              ->  index
 * POST    /api/requests              ->  create
 * GET     /api/requests/:id          ->  show
 * PUT     /api/requests/:id          ->  update
 * DELETE  /api/requests/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Request from './request.model';
const Notification = require('../notification/notification.model');
const User = require('../user/user.model');

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

// Gets a list of Requests
export function index(req, res) {
  return Request.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Request from the DB
export function show(req, res) {
  return Request.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function checkRecipient(req, res, next) {

  function notFound() {
    return res.status(404).send('Recipient not found');
  }

  if (!req.body.recipient) {
    return notFound();
  }

  User.findOne({email: req.body.recipient})
    .exec()
    .then(user => {
      if (user) {
        req.recipient = user;
        return next();
      }
      return notFound();
    })
}

// Creates a new Request in the DB
export function create(req, res) {
  const request = new Request({
    type: req.body.type,
    recipient: req.recipient._id,
    sender: req.user._id
  });

  const notification = new Notification({
    request: request._id,
    sender: req.user._id,
    recipient: req.recipient._id
  })

  req.recipient.notifications.push(notification._id);
  req.user.requests.push(request._id);
  req.recipient.save();
  req.user.save();
  notification.save();
  return request.save()
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Request in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Request.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Request from the DB
export function destroy(req, res) {
  return Request.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
