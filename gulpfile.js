var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    eslint = require('gulp-eslint'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-csso'),
    htmlmin = require('gulp-htmlmin'),
    favicons = require("gulp-favicons");

gulp.task('default', ['make-build']);

gulp.task('make-build', function() {
    runSequence(
        'eslint',
        'image-min',
        'concat-files',
        'css-min',
        'html-min',
        'copy-files',
        'copy-fonts'
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
        './README.md',
        './assets/img/dest/**/*.{png,jpg}'
    ];
    return gulp.src(filesToMove, {
            base: './'
        })
        .pipe(gulp.dest('build'));
});

gulp.task('copy-fonts', function() {
    return gulp.src('./assets/lib/mdi/fonts/*')
        .pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('favicon', function () {
    return gulp.src('./assets/img/dest/logo.png')
        .pipe(favicons({
            appName: 'Personal Website',
            appDescription: 'This is my website',
            developerName: 'Jonatas Leon',
            developerURL: 'http://jonatasleon.com/',
            background: '#183D9C',
            path: 'favicons/',
            url: 'http://jonatasleon.com/',
            display: 'standalone',
            orientation: 'portrait',
            version: 1.0,
            logging: false,
            online: true,
            html: 'index.html',
            pipeHTML: true,
            replace: true
        }))
        .pipe(gulp.dest('./'));
});
