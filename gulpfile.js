// Load plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();


// Variables
var SASSinput = 'static/sass/*.sass';
var HTMLinput = 'templates/*.html';
var SASSoutput = 'static/css';


// Styles Task - Converting SASS to CSS
gulp.task('sass', function () {
  return gulp
    // Find all '.sass' files from the 'SASSinput' folder
    .src(SASSinput)
    // Run Sass on those files
    .pipe(sass().on('error', sass.logError))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(SASSoutput))
    // Reload browsers
    // .pipe(browserSync.stream());
});


// Static server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "templates"
//         }
//     });
// });


gulp.task('watch', function() {
  return gulp
    // Watch SASSinput and templates folder for change
    .watch([SASSinput, HTMLinput], ['sass'])
    // When there is a change, log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});