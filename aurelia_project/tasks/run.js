import gulp from 'gulp';
import browserSync from 'browser-sync';
import project from '../aurelia.json';
import build from './build';
import {CLIOptions} from 'aurelia-cli';
import path from 'path';

global.fromRoot    = path.join.bind(path, __dirname);

global.requireRoot = () => {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(__dirname)
  return require(path.join.apply(path, args))
}


function onChange(path) {
  console.log(`File Changed: ${path}`);
}

function reload(done) {
  browserSync.reload();
  done();
}

function startServer(done) {
  if (CLIOptions.hasFlag('server')) {
    require('../../application/server');
  }

  done();
}

let serve = gulp.series(
  startServer,
  build,
  done => {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      server: {
        baseDir: ['.'],
        middleware: function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    }, done);
  }
);

let refresh = gulp.series(
  build,
  reload
);

let watch = function() {
  gulp.watch(project.transpiler.source, refresh).on('change', onChange);
  gulp.watch(project.markupProcessor.source, refresh).on('change', onChange);
  gulp.watch(project.cssProcessor.sassSource, refresh).on('change', onChange);
  gulp.watch(project.cssProcessor.cssSource, refresh).on('change', onChange);
}

let run;

if (CLIOptions.hasFlag('watch')) {
  run = gulp.series(
    serve,
    watch
  );
} else {
  run = serve;
}

export default run;
