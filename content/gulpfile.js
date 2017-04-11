var gulp = require("gulp");
var stylus = require("gulp-stylus");
var plumber = require("gulp-plumber");

gulp.task("default", function() {
    gulp.run("css")
})
gulp.task("css", function() {
    gulp.src("style/stylus/*.styl")
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest("style/css"))
})
gulp.watch("style/stylus/*.styl", ["css"]);