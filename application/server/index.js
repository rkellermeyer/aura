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
const argv = require('minimist')(process.argv.slice(2));


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

console.log(argv)

// Populate databases with sample data
if (argv.seed) {
  console.log('SEDING:DATABASE');
   config.seedDB = true;
   require('./config/seed');
}

const settings = {
  config,
  socketio: {
    serveClient: config.env !== 'production',
    origins: '*:*',
    path: '/socket.io-client'
  }
}

const Server   = require('./server');

exports = module.exports = new Server(settings);


setImmediate(exports.start);
