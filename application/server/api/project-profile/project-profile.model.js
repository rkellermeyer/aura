'use strict';

const mongoose = require('mongoose');
const PointSchema = require('./point.model').Schema;

function SchemaRef(refname) {
  return {type: mongoose.Schema.Types.ObjectId, ref: refname};
}

var ProjectProfileSchema = new mongoose.Schema({
  id: Number,
  title: String,
  teaser: String,
  overview: String,
  primary: Boolean,
  a_b_order: String,
  statuses: [],

  category_id: Number,
  category: SchemaRef('Category'),

  points: [PointSchema],
  archivedPoints: [PointSchema],

  user_id: Number,
  user: SchemaRef('User'),

  project_id: Number,
  project: SchemaRef('Project')
});

module.exports = mongoose.model('ProjectProfile', ProjectProfileSchema);
