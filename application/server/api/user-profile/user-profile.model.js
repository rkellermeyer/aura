'use strict';

import mongoose from 'mongoose';

var UserProfileSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  middle_initial: String,
  last_name: String,
  prefix: String,
  suffix: String,
  bio: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  avatar_file_name:String,
  avatar_content_type:String,
  avatar_file_size:String,
  avatar_updated_at:{ type: Date, default: Date.now },

  user_id: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('UserProfile', UserProfileSchema);
