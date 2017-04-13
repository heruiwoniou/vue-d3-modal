var path = require('path'),
    gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc3'),
    clean = require('gulp-clean'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('autoprefixer-stylus'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    server = require('gulp-ss-server'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

var styles = ['src/styles/pages/index.styl']

gulp.task('doc', function (cb) {
    gulp.src([
        'README.md', './src/**/*.js'
    ], {read: false}).pipe(jsdoc(require('./jsdoc.json'), cb));
});
gulp.task('clean', function () {
    return gulp
        .src('dist', {read: false})
        .pipe(clean());
})
gulp.task('image', function () {
    return gulp
        .src(['src/styles/images/*.*'])
        .pipe(gulp.dest('dist/styles/images'));
})
gulp.task('css', function () {
    gulp.run('image');
    gulp
        .src(styles)
        .pipe(stylus({
            use: [autoprefixer({
                    browsers: [
                        'last 5 versions', 'ie >= 8'
                    ],
                    cascade: false
                })]
        }))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/styles'));

    gulp
        .src(['src/styles/common.styl'])
        .pipe(stylus({
            use: [autoprefixer({
                    browsers: [
                        'last 5 versions', 'ie >= 8'
                    ],
                    cascade: false
                })]
        }))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scriptCommon', function () {
    gulp
        .src([
        'node_modules/jquery/dist/jquery.min.js',
        'src/libs/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js',
        'node_modules/es6-promise/dist/es6-promise.auto.js',
        'node_modules/vue/dist/vue.min.js',
        'src/libs/lodash/lodash.min.js',
        'node_modules/d3/build/d3.min.js'
    ])
        .pipe(concat('common.js'))
        .pipe(gulp.dest('dist/scripts/'));
    
});
gulp.task('script',()=>gulp
        .src(['src/*.js'])
        .pipe(gulp.dest('dist/scripts/')))

gulp.task('default', function () {
    server.run({port: 3000})
    gulp.run('doc', 'image', 'css', 'script','scriptCommon');
    gulp.watch(styles,function(){
        gulp.run('css');
    })
    gulp.watch('src/*.js',()=>gulp.run('script'))
    gulp.watch([
        'README.md', './src/**/*.js'
    ], function () {
        gulp.run('doc');
    })
})