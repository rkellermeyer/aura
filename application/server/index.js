process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Main application file
 */

'use strict';

const express    = require('express');
const mongoose   = require('mongoose');
const bluebird   = require('bluebird');
mongoose.Promise = bluebird;
const config     = require('./config/environment');
const http       = require('http');


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});


// Populate databases with sample data
if (process.argv[2] === '--seed') {
  console.log('seeding')
   config.seedDB = true;
   require('./config/seed');
}

const settings = {
  config,
  socketio: {
    serveClient: config.env !== 'production',
    path: '/socket.io-client'
  }
}

const Server   = require('./server');

exports = module.exports = new Server(settings);

setImmediate(exports.start);
