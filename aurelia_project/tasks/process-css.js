import path from 'path';
import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import minfy from 'gulp-clean-css';
import prefixer from 'gulp-autoprefixer';
import stripCssComments from 'gulp-strip-css-comments';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';
import sassGlob from 'gulp-sass-bulk-import';

let cwd = path.join.bind(path, process.cwd());
let npm  = cwd.bind(cwd, 'node_modules');
let options = {
  errLogToConsole: true,
  includePaths: require('node-neat').includePaths.concat(
    npm('sassdash/scss'),
    npm('include-media/dist/_include-media.scss'),
    npm('foundation-sites/scss'),
    npm('motion-ui/src')
  )
};

export function processSass() {
  return gulp.src(project.cssProcessor.sassSource)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(prefixer())
    .pipe(stripCssComments())
    .pipe(minfy())
    .pipe(build.bundle());
};

export function processCSS() {
  return gulp.src(project.cssProcessor.cssSource)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(build.bundle());
};

export default gulp.parallel(
  processSass,
  processCSS
);
