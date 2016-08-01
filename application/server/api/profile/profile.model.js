'use strict';

import mongoose from 'mongoose';

var ProfileSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Profile', ProfileSchema);
