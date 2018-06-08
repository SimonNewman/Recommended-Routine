var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    svgo = require('gulp-svgo'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util');


gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(''))
});

gulp.task('svgo', function(){
  return gulp.src('src/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('images'));
});

gulp.task('watch', function(){
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('src/img/*.svg', ['svgo']);
  gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('routine.min.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(''));
});
