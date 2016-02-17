"use strict";

var gulp = require("gulp"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

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

gulp.task("default", ["imgmin"]);
