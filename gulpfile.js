const { src, dest, parallel, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/**
 * Compile scss files to css
 */
function scssToCss() {
  return src('./sass/helpers/import.scss')
    .pipe(gulpSass())
    .pipe(dest('./css'))
    .pipe(browserSync.stream())
}

/**
 * Handle SCSS changes to run function
 */
function watchScssChanges() {
  watch('./sass/', scssToCss);
  browserSync.reload();
}

/**
 * Handle HTML changes to run function
 */
function watchHtmlChanges() {
  watch("*.html").on('change', browserSync.reload);
}

/**
 * Start local live server
 */
function startServer() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

/**
 * Export commands usable
 * `gulp <command>`in terminal
 */
module.exports = {
  start: parallel(startServer, watchScssChanges, watchHtmlChanges)
}