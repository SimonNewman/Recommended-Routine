var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat');


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

gulp.task('babel', () =>
  gulp.src([
    'src/js/Exercise.js',
    'src/js/Log.js',
    'src/js/Progression.js',
    'src/js/Routine.js',
    'src/js/Workout.js',
    'src/js/app.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .on('error', function(e) {
      console.log('>>> ERROR', e);
    })
    .pipe(concat('routine.js'))
    .pipe(sourcemaps.write('.'))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(''))
);

gulp.task('watch', function(){
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('src/img/*.svg', ['svgo']);
  gulp.watch('src/js/*.js', ['babel']);
});