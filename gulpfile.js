
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

const jsFiles = [
  './js/lib.js',
  './js/common.js',
];

function compileCSS() {
  return gulp.src('./styles/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
}

function compileJS() {
  return gulp.src(jsFiles)
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./build/js'));
}

function watch() {
  browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true
    });
  gulp.watch('./build/css/main.min.css', compileCSS);
  gulp.watch('./build/js/main.js', compileCSS);
  gulp.watch('./*.html', browserSync.reload);
}

function clean() {
  return del([
    './build/*']);
}

gulp.task('compile', compileCSS);
gulp.task('scripts', compileJS);
gulp.task('watch', watch);
gulp.task('default', gulp.series(clean, gulp.parallel(compileCSS, compileJS), 'watch'));