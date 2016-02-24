'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence');

gulp.task('default', ['make-build']);

gulp.task('make-build', function() {
    runSequence('img-min', 'resolve-assets', 'move-files');
});

gulp.task('img-min', function() {
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

gulp.task('resolve-assets', function() {
    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', concatCss('css/myappstyle.css')))
        .pipe(gulpif('*.js', concat('js/myappscript.js')))
        .pipe(gulp.dest('build'));
});

gulp.task('move-files', function() {
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
