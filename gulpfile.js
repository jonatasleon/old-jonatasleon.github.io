'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css');

gulp.task('default', ['make-build']);

gulp.task('make-build', function() {
    runSequence('del-build', 'eslint', 'image-min', 'concat-files', 'copy-files');
});

gulp.task('image-min', function() {
    return gulp.src('./img/src/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img/dest/'));
});

gulp.task('concat-files', function() {
    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', concatCss('css/styles.css')))
        .pipe(gulpif('*.js', concat('js/scripts.js')))
        .pipe(gulp.dest('build'));
});

gulp.task('copy-files', function() {
    var filesToMove = [
        '.travis.yml',
        './CNAME',
        './README.md',
        './view/**/*.html',
        './img/dest/**/*.{png,jpg}'
    ];
    return gulp.src(filesToMove, {
            base: './'
        })
        .pipe(gulp.dest('build'));
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

gulp.task('del-build', function() {
    return del(['./build/']);
});
