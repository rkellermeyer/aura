'use strict';

import mongoose from 'mongoose';
// import {ProjectSchema} from '../user/user.model';

var ProjectSchema = new mongoose.Schema({
  id: Number,
  funding_goal: String,
  title: String,
  abtx: String
});


export default mongoose.model('Project', ProjectSchema);
