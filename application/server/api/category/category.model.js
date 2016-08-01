'use strict';

const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  parent_id: Number,
  active: Boolean,
  uspto: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', CategorySchema);
