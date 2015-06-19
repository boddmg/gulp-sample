var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var watchPath = require('gulp-watch-path')

var paths = {
  coffee: ['./src/coffee/*.coffee'],
  dstJsDir: "./dist/js/"
};

var convertCoffee = function(srcPath, dstDir) {
  var stream = gulp.src(srcPath)
    .pipe(coffee())
    .on('error', function(error) {
      gutil.log(error.toString());
      this.emit('end');
      })
    .pipe(gulp.dest(dstDir));
}

gulp.task('coffee', function(){
  convertCoffee(paths.coffee, paths.dstJsDir);
});

gulp.task('watch', function(){
  gulp.watch(paths.coffee, function(event) {
    var paths = watchPath(event, "src/coffee/", "dist/js/");
    gutil.log(gutil.colors.green(event.type) + " " + paths.srcPath);
    gutil.log('Dist ' + paths.distDir);
    convertCoffee(paths.srcPath, paths.distDir);
  })
})

gulp.task('concat', function() {
  return gulp.src(paths.dstJsDir+"*.js")
    .pipe(concat("index.js"))
    .pipe(gulp.dest("./"));
})

gulp.task('default', ['coffee']);
gulp.task('watch-concat', ['watch', 'concat']);
