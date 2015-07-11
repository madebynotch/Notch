// Load Gulp Requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


// Custom Variables
var SASSinput = 'static/sass/*.sass';
var HTMLinput = 'templates/*.html';
var SASSoutput = 'static/css';


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "templates/index.html"
        }
    });
});


// Main Task to run all sub-tasks
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "templates/index.html"
        }
    });

    gulp.watch(SASSinput, ['sass']);
    gulp.watch('templates/*.html').on('change', browserSync.reload);
});


// Compile SASS to CSS
gulp.task('sass', function () {
  return gulp
    // Find all '.sass' files from the 'SASSinput' folder
    .src(SASSinput)
    // Run Sass on those files
    .pipe(sass().on('error', sass.logError))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(SASSoutput))
    // Reload browsers
    .pipe(browserSync.stream());
});


// SASS Watch
gulp.task('watch-sass', function() {
  return gulp
    // Watch SASS folder (SASSinput) for change
    .watch(SASSinput, ['sass']);
});


// HTML Watch
gulp.task('watch-html', ['browser-sync'], function() {
  return gulp
    // Watch templates folder (HTMLinput) for change
    .watch('templates/*.html').on('change', browserSync.reload);
});