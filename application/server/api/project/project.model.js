'use strict';

const mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  id: Number,
  funding_goal: String,
  title: String,
  abtx: String
});


module.exports = mongoose.model('Project', ProjectSchema);
