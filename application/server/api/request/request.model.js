'use strict';

import mongoose from 'mongoose';

var RequestSchema = new mongoose.Schema({
  type: String,
  status: {type: String, default: 'active'},
  recipient: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  sender: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
});

export default mongoose.model('Request', RequestSchema);
