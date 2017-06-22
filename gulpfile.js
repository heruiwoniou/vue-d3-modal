var path = require('path')
var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')
var clean = require('gulp-clean')
var stylus = require('gulp-stylus')
var autoprefixer = require('autoprefixer-stylus')
var uglify = require('gulp-uglify')
var cleancss = require('gulp-clean-css')
var server = require('gulp-ss-server')
var concat = require('gulp-concat')
var rename = require('gulp-rename')

var styles = [
  'src/styles/pages/index-dark.styl',
  'src/styles/pages/index-white.styl',
  'src/styles/pages/news.styl',
  'src/styles/pages/news-white.styl',
  'src/styles/pages/comment.styl',
  'src/styles/pages/comments.styl',
  'src/styles/pages/calendar.styl',
  'src/styles/pages/share.styl',
  'src/components.styl'
]
gulp.task('doc', function (cb) {
  gulp.src([
    'README.md', './src/**/*.js'
  ], {read: false}).pipe(jsdoc(require('./jsdoc.json'), cb))
})
gulp.task('clean', function () {
  return gulp
    .src('dist', {read: false})
    .pipe(clean())
})
gulp.task('image', function () {
  return gulp
    .src(['src/styles/images/*.*'])
    .pipe(gulp.dest('dist/styles/images'))
})
gulp.task('css', function () {
  gulp.run('image')
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
    .pipe(gulp.dest('dist/styles'))

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
    .pipe(gulp.dest('dist/styles'))
})

gulp.task('scriptCommon', function () {
  gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'src/libs/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js',
      'node_modules/es6-promise/dist/es6-promise.auto.js',
      'node_modules/vue/dist/vue.min.js',
      'src/libs/lodash/lodash.min.js',
      'src/libs/clickoutside/index.js',
      'node_modules/d3/build/d3.min.js',
      'src/libs/moment.js',
      'src/libs/fullcalendar.min.js',
      'src/libs/jquery-ui.min.js'
    ])
    .pipe(concat('common.js'))
    .pipe(gulp.dest('dist/scripts/'))

  gulp
    .src(['src/libs/My97DatePicker/**/*.*'])
    .pipe(gulp.dest('dist/scripts/My97DatePicker/'))
})
gulp.task('script', () => gulp.src(['src/*.js']).pipe(gulp.dest('dist/scripts/')))

gulp.task('default', function () {
  server.run({port: 3000})
  gulp.run('doc', 'image', 'css', 'script', 'scriptCommon')
  gulp.watch([
    'src/styles/**/*.styl', 'src/styles/common.styl'
  ], function () {
    gulp.run('css')
  })
  gulp.watch('src/*.js', () => gulp.run('script'))
  gulp.watch([
    'README.md', './src/**/*.js'
  ], function () {
    gulp.run('doc')
  })
})
