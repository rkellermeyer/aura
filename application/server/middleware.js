/**
 * Express configuration
 */

'use strict';

const express        = require('express');
const favicon        = require('serve-favicon');
const morgan         = require('morgan');
const compression    = require('compression');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const cookieParser   = require('cookie-parser');
const errorHandler   = require('errorhandler');
const path           = require('path');
const lusca          = require('lusca');
const config         = require('./config/environment');
const passport       = require('passport');
const session        = require('express-session');
const connectMongo   = require('connect-mongo');
const mongoose       = require('mongoose');
const MongoStore     = connectMongo(session);
const cors           = require('cors');
module.exports = function middleware(app) {
  const env = app.get('env');

  if (env === 'production') {
    // app.use(favicon(path.join(config.root, 'favicon.ico')));
  }

  app.set('appPath', path.join(config.root));
  app.use(express.static(app.get('appPath')));
  app.use(express.static(__dirname));
  app.use(morgan('dev'));

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  app.use(cors())
  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'heroku_03qw6v0x'
    })
  }));
  app.use((req, res, next)=> {
    next()
  })
  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if (env !== 'test' && !process.env.SAUCE_USERNAME) {
    // app.use(lusca({
    //   csrf: {
    //     angular: true
    //   },
    //   xframe: 'SAMEORIGIN',
    //   hsts: {
    //     maxAge: 31536000, //1 year, in seconds
    //     includeSubDomains: true,
    //     preload: true
    //   },
    //   xssProtection: true
    // }));
  }

  if ('development' === env) {
    // app.use(require('connect-livereload')({
    //   ignore: [
    //     /^\/api\/(.*)/,
    //     /\.js(\?.*)?$/, /\.css(\?.*)?$/, /\.svg(\?.*)?$/, /\.ico(\?.*)?$/, /\.woff(\?.*)?$/,
    //     /\.png(\?.*)?$/, /\.jpg(\?.*)?$/, /\.jpeg(\?.*)?$/, /\.gif(\?.*)?$/, /\.pdf(\?.*)?$/
    //   ]
    // }));
  }

  if ('development' === env || 'test' === env) {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
