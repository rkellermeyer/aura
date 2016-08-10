'use strict';

const User = require('./user.model');
const UserProfile = require('../user-profile/user-profile.model');
const passport = require('passport');
const config = require('../../config/environment');
const jwt = require('jsonwebtoken');

module.exports = {index, create, show, destroy, changePassword, me, authCallback};

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

  /**
   * Get list of users
   * restriction: 'admin'
   */
function index(req, res) {
  return User.find({}, '-salt -password').populate('projects user_profile')
    .exec()
    .then((users)=> onfind(users))
    .catch(handleError(res));

  /////////////////////
  function onfind(users) {
    res.status(200).json(users);
  }
}

  /**
   * Creates a new user
   */
function  create(req, res, next) {
  req.body.role = req.body.role || 'dreamer';

  const model   = new User(req.body);
  const profile = new UserProfile(req.body);
  model.provider = 'local';

  model.user_profile = profile._id;
  profile.user = model._id;
  profile.save();
  model.save()
    .then((user)=> onsave(user))
    .catch(validationError(res));

  /////////////////////
  function onsave(user) {
    let token = jwt.sign({ _id: user._id }, config.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    res.json({ token });
  }
}

  /**
   * Get a single user
   */
function  show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId)
    .populate('user_profile projects')
    .exec()
    .then(user => onfind(user))
    .catch(err => next(err));

  /////////////////////
  function onfind(user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  }
}

  /**
   * Deletes a user
   * restriction: 'admin'
   */
function  destroy(req, res) {
  return User.findByIdAndRemove(req.params.id)
    .exec()
    .then(ondestroy)
    .catch(handleError(res));

  ///////////////////
  function ondestroy() {
    res.status(204).end();
  }
}

  /**
   * Change a users password
   */
function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId)
    .exec()
    .then(setNewPassword)
    .catch(handleError(res))

  /////////////////////////////
  function setNewPassword(user) {
    if (!user.authenticate(oldPass)) return onfail();

    user.password = newPass;
    return user.save()
      .then(()=> onsave())
      .catch(validationError(res));
  }

  function onfail() {
    res.status(403).end();
  }

  function onsave() {
    res.status(204).end();
  }
}

  /**
   * Get my info
   */
function  me(req, res, next) {
  let userId = req.user._id;
  let query  = { _id: userId };

  return User.findOne(query, '-salt -password')
    .populate('projects user_profile rooms')
    .exec()
    .then(user => onfind(user))
    .catch(err => next(err));

  ////////////////////
  function onfind(user) { // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }
}

  /**
   * Authentication callback
   */
function authCallback(req, res, next) {
  res.redirect('/');
}
