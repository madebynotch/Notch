// Load Gulp Requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;


// Custom Variables
var SASSinput = 'static/sass/*.sass';
var HTMLinput = ['templates/*.html','*/templates/*.html'];
var JSinput = ['static/js/*.js'];
var SASSoutput = 'static/css';
var localhostPort = '8888';


// Django server
gulp.task('django-server', function() {
    var proc = exec('PYTHONUNBUFFERED=1 python manage.py runserver ' + localhostPort);
    proc.stderr.on('data',function(data){
        process.stdout.write(data);
    });
});


// Django server and Browser Sync
gulp.task('django-sync', ['django-server'], function() {
    browserSync.init({
        proxy: {
            target: "localhost:" + localhostPort
        }
    });
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
gulp.task('watch-html', ['django-sync'], function() {
  return gulp
    // Watch templates folder (HTMLinput) for change
    .watch(HTMLinput).on('change', browserSync.reload);
});

// JS Watch
gulp.task('watch-js', function() {
    return gulp
    // Watch js files for change
    .watch(JSinput).on('change', browserSync.reload);
})


// Main Task to run all sub-tasks
gulp.task('connect', ['sass', 'watch-sass', 'watch-html', 'watch-js']);