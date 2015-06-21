var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var watchPath = require('gulp-watch-path')
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var paths = {
  coffee: ['./src/coffee/*.coffee'],
  static: ['./src/html/*.html', './src/css/*.css'],
  dstJsDir: "./dist/js/",
  distDir: "./dist/",
  mainHtml: "./src/html/index.html"
};

gulp.task('watch', function(){
  gulp.watch(paths.coffee, function(event) {
    runSequence('minify');
  });

  gulp.watch(paths.static, function(event) {
    var changedPaths = watchPath(event, "src/", "dist/");
    gutil.log(gutil.colors.green(event.type) + " " + changedPaths.srcPath);
    gutil.log('Dist ' + changedPaths.distDir);
    if (changedPaths.srcPath.match("index.html") != null) {
      gulp.src(changedPaths.srcPath)
        .pipe(gulp.dest("./dist/"));
    }else{
    gulp.src(changedPaths.srcPath)
      .pipe(gulp.dest(changedPaths.distDir));
    }
  });

})

gulp.task('minify', function() {
  gulp.src(paths.coffee)
    .pipe(coffee())
    .on('error', function(error) {
      gutil.log(error.toString());
      })
    .pipe(concat("app.js"))
    .pipe(gulp.dest(paths.distDir))
    .pipe(browserify())
    .on('error', function(error) {
      gutil.log(error.toString());
      })
    .pipe(rename("bundle.js"))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('copy-static', function(){
  gulp.src(paths.static[1])
    .pipe(gulp.dest("./dist/css/"));
  gulp.src(paths.mainHtml)
    .pipe(gulp.dest("./dist/"));
})


gulp.task('default', ['minify', 'copy-static', 'watch']);
