'use strict';

const mongoose = require('mongoose');

function SchemaRef(refname) {
  return {type: mongoose.Schema.Types.ObjectId, ref: refname};
}

var PointSchema = new mongoose.Schema({
  title: String,
  text: String,
  content: String,
  summary: String,
  image: String,
  points: [],
})

module.exports.Schema = PointSchema;
module.exports.Model = mongoose.model('ProjectProfilePoint', PointSchema);
