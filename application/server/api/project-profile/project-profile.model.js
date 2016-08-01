'use strict';

const mongoose = require('mongoose');

function SchemaRef(refname) {
  return {type: mongoose.Schema.Types.ObjectId, ref: refname};
}

var ProjectProfileSchema = new mongoose.Schema({
  id: Number,
  teaser: String,
  overview: String,
  primary: Boolean,
  a_b_order: String,
  statuses: [],

  category_id: Number,
  category: SchemaRef('Category'),


  user_id: Number,
  user: SchemaRef('User'),

  project_id: Number,
  project: SchemaRef('Project')
});

module.exports = mongoose.model('ProjectProfile', ProjectProfileSchema);
