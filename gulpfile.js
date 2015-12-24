"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task("sass", function() {
    gulp.src("./assets/sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./assets/css/"));
});

gulp.task("sass:watch", function () {
    gulp.watch("./assets/sass/**/*.scss", ["sass"]);
});

gulp.task("img-opt", function() {
    gulp.src("./assets/img/src/**/*")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest("./assets/img/dest/"));
});

gulp.task("default", ["sass:watch"]);
