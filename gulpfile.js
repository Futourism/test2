/*jslint node: true */
"use strict";

var gulp = require("gulp");
var LiveServer = require("gulp-live-server");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoPrefixer = require("gulp-autoprefixer");
var minifyCss = require("gulp-minify-css");
var concat = require("gulp-concat");
var sourceMaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var tsproject = require("tsproject");

gulp.task("live-server", function () {
    var server = new LiveServer("app.js");
    server.start();
});

gulp.task("serve", ["live-server"], function () {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        port: 8081,
        reloadDelay: 5000
    });
});

gulp.task("styles", function () {
    gulp.src("common/app.scss")
        .pipe(sass({
            style: "expanded"
        }).on("error", sass.logError))
        .pipe(autoPrefixer("last 2 versions", "ie >= 9", "and_chr >= 2.3"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(minifyCss())
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("fonts", function () {
    return gulp.src(["bower_components/components-font-awesome/fonts/fontawesome-webfont.*"])
        .pipe(gulp.dest("./public/fonts/"));
});

gulp.task("typescripts", function () {
    return tsproject.src("./")
        .pipe(gulp.dest("./public/js/"));
});

gulp.task("jscripts", ["typescripts"], function () {
    gulp.src(["bower_components/system.js/dist/system.js",
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/foundation-sites/dist/foundation.min.js",
            "bower_components/foundation-sites/js/foundation.util.mediaQuery.js",
            "node_modules/angular2/bundles/angular2-polyfills.min.js",
            "node_modules/angular2/bundles/angular2.min.js",
            "node_modules/angular2/bundles/router.min.js"
        ])
        .pipe(sourceMaps.init())
        .pipe(concat("framework.js"))
        .pipe(uglify())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest("./public/js/"));
});

gulp.task("reloadBrowser", function () {
    browserSync.reload();
});

gulp.task("default", ["serve", "jscripts", "styles", "fonts"], function () {
    gulp.watch(["common/**/*.scss",
                "extra-modules/**/*.scss",
                "pages/**/*.scss"], ["styles", "reloadBrowser"]);
});