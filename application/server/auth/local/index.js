'use strict';

const express = require('express');
const passport = require('passport');
const signToken = require('../auth.service').signToken;
const cookie = require('cookie')
const url = require('url');
module.exports = express.Router();

module.exports.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);

    var query = url.parse(req.url, true, true).query;

    // Set a new cookie with the name
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // Redirect back after setting cookie
    res.statusCode = 302;
    // res.setHeader('Location', req.headers.referer || '/');
    res.json({ token });
  })(req, res, next)
});
