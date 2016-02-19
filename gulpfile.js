"use strict";

var gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    runSequence = require("run-sequence");

gulp.task("default", ["make-build"]);

gulp.task("make-build", function() {
    runSequence("imgmin", "move-files");
});

gulp.task("imgmin", function() {
    gulp.src("./img/src/**/*")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest("./img/dest/"));
});

gulp.task("move-files", function() {
    var filesToMove = [
        "./index.html",
        "./CNAME",
        "./README.md",
        "./view/**/*.html",
        "./js/**/*.js",
        "./css/**/*.css",
        "./img/dest/**/*.{png, jpg}"
    ];
    gulp.src(filesToMove, {
            base: "./"
        })
        .pipe(gulp.dest("build"));
});
