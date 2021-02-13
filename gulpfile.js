// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
  src,
  dest,
  series,
  parallel
} = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

// File paths
const files = {
  cssPath: 'assets/css/**/*.css'
}

// Sass task: compiles the style.scss file into style.css
function cssTask() {
  return src([
    'css/pe-icon-7-stroke.css', 
    'css/bootstrap.min.css',
    'css/materialdesignicons.min.css',
    'css/swiper.min.css',
    'css/magnific-popup.css',
    'css/owl.carousel.css',
    'css/owl.theme.css',
    'css/owl.transitions.css',
    'css/menu.css',
    'css/**/*.css'])
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(dest('dist')); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
      'js/jquery.min.js',
      'js/popper.min.js',
      'js/bootstrap.min.js',
      'js/jquery.easing.min.js',
      'js/scrollspy.min.js',
      'js/owl.carousel.min.js',
      'js/swiper.min.js',
      'js/jquery.magnific-popup.min.js',
      'js/app.js',
      'js/**/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist'));
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  parallel(cssTask, jsTask)
);