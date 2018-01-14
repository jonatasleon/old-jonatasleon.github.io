const gulp = require('gulp');
const runSequence = require('run-sequence');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const cssmin = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const favicons = require('gulp-favicons');
const uglify = require('gulp-uglify');
const uncss = require('gulp-uncss');

gulp.task('default', ['make-build']);

gulp.task('make-build', function() {
  runSequence(
    ['eslint', 'concat-files'],
    [
      'image-min',
      'css-min',
      'html-min',
      'copy-files',
      'copy-fonts'
    ],
    'copy-images'
  );
});

gulp.task('eslint', function() {
  return gulp.src('./js/**/*.js')
    .pipe(eslint({
      extends: 'eslint:recommended',
      rules: {
        'no-console': 0,
        'semi': [2, 'always'],
        'linebreak-style': [2, 'unix'],
        'quotes': [2, 'double']
      },
      globals: {
        'angular': true,
        'Firebase': true
      },
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.failOnError());
});

gulp.task('image-min', function() {
  return gulp.src('./assets/img/src/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./assets/img/dest/'));
});

gulp.task('concat-files', function() {
  return gulp.src('./index.html')
    .pipe(useref())
    .pipe(gulpif('*.css', concatCss('assets/css/styles.css')))
    .pipe(gulpif('*.js', concat('assets/js/scripts.js')))
    .pipe(gulpif('*.css', uncss({
      html: ['index.html', 'partials/*.html']
    })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('build/'));
});

gulp.task('css-min', function() {
  return gulp.src('./build/css/styles.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('html-min', function() {
  return gulp.src('./partials/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./build/partials/'));
});

gulp.task('copy-files', function() {
  var filesToMove = [
    '.travis.yml',
    './CNAME',
    './README.md'
  ];
  return gulp.src(filesToMove, {
      base: './'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('copy-images', function() {
  return gulp.src('./assets/img/dest/*.{png,jpg}', {
      base: './'
    })
    .pipe(gulp.dest('build'));
})

gulp.task('copy-fonts', function() {
  return gulp.src('./assets/lib/mdi/fonts/*')
    .pipe(gulp.dest('./build/assets/fonts/'));
});
