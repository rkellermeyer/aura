'use strict';

import mongoose from 'mongoose';


const MessageSchema = new mongoose.Schema({
  content: String,
  received: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: { type: Date, default: Date.now },
})

var RoomSchema = new mongoose.Schema({
  name: String,
  info: String,
  accepted: Boolean,
  messages: [MessageSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export default mongoose.model('Room', RoomSchema);
