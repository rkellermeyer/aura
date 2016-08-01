'use strict';

import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  parent_id: Number,
  active: Boolean,
  uspto: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Category', CategorySchema);
