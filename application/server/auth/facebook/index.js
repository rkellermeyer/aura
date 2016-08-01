'use strict';

const express = require('express');
const passport = require('passport');
const setTokenCookie = require('../auth.service').setTokenCookie;

const router = module.exports = express.Router();


router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'user_about_me'],
  failureRedirect: '/signup',
  session: false
}));

router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/signup',
  session: false
}), setTokenCookie);
