"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    concatCss = require("gulp-concat-css"),
    htmlReplace = require("gulp-html-replace"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    runSequence = require("run-sequence");

gulp.task("default", ["make-build"]);

gulp.task("make-build", function() {
    runSequence("img-min", "build-js", "build-css", "html-replace", "move-files");
});

gulp.task("img-min", function() {
    return gulp.src("./img/src/**/*")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest("./img/dest/"));
});

gulp.task("build-js", function() {
    var filesToConcat = [
        "./lib/firebase/firebase.js",
        "./lib/angular/angular.js",
        "./lib/angularfire/dist/angularfire.js",
        "./lib/angular-route/angular-route.js",
        "./lib/angular-animate/angular-animate.js",
        "./js/app.js",
        "./js/controllers/*.js",
        "./js/services/*.js",
        "./js/value/*.js"
    ];
    return gulp.src(filesToConcat)
        .pipe(concat("app.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task("build-css", function() {
    var filesToConcat = [
        "./css/reset.css",
        "./lib/flexboxgrid/dist/flexboxgrid.css",
        "./css/style.css",
        "./css/ngstyle.css"
    ];
    return gulp.src(filesToConcat)
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("html-replace", function() {
    return gulp.src("./index.html")
        .pipe(htmlReplace({
            "js": "js/app.js",
            "css": "css/style.css"
        }))
        .pipe(gulp.dest("build"));
});

gulp.task("move-files", function() {
    var filesToMove = [
        "./CNAME",
        "./README.md",
        "./view/**/*.html",
        "./img/dest/**/*.{png,jpg}"
    ];
    return gulp.src(filesToMove, {
            base: "./"
        })
        .pipe(gulp.dest("build"));
});
