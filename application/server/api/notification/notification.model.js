'use strict';

import mongoose from 'mongoose';

function SchemaRef(ref, required = false) {
  return {type: mongoose.Schema.Types.ObjectId, ref, required}
}

var NotificationSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,

  type: {
    type: String,
    default: 'request'
  },

  sender: SchemaRef('User', true),
  receiver: SchemaRef('User', true),
  request: SchemaRef('Request'),
  room: SchemaRef('Room')
});

export default mongoose.model('Notification', NotificationSchema);
