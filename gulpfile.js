var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

gulp.task('js', function() {
  var bundler = browserify({
    // Required watchify args
    cache: {},
    packageCache: {},
    // Specify the entry point of your app
    entries: ['./public/js/main.js']
  });

  var bundle = function() {
    return bundler
      .transform(reactify)
      .bundle()
      .pipe(source('bundle.js'))
      // convert from streaming to buffered vinyl file object
      .pipe(buffer())
      .pipe(gulp.dest('./public/dist/'));
  };

  bundler = watchify(bundler);
  bundler.on('update', function() {
    bundle();
  });

  return bundle();
});

gulp.task('serve', function() {
  nodemon({ script: 'app.js', ext: 'ejs js' })
    .on('change', ['js'])
    .on('restart', function () {
      console.log('restarted!')
    });
});

gulp.task('watch', ['js'], function() {
  gulp.start('serve');
});

gulp.task('default', function() {
    gulp.start('watch');
});