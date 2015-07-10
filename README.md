====================
====================
GULP COMMANDS
====================
====================
gulp sass
// Compiles SASS files in 'SASSinput' to CSS and saves them in 'SASSoutput'

gulp watch-sass
// Watches 'SASSinput' for changes. When changes are made, runs the 'gulp-sass' task

gulp watch-html
// Watches 'HTMLinput' for changes. When changes are made, reloads the browser

gulp connect
// Runs the above tasks in this order: gulp sass, gulp watch-sass, gulp watch-html