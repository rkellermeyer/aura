'use strict';

const express = require('express');
const passport = require('passport');
const config = require('../config/environment');
const User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);

module.exports = express.Router();
module.exports.use('/local', require('./local'));
