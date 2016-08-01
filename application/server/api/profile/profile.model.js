'use strict';

const mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Profile', ProfileSchema);
