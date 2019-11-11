const gulp = require('gulp');

function defaultTask(done) {
  gulp.src([
    'presentation/**/*',
    'presentation/**/*'
  ], { "base" : "presentation" })
  .pipe(gulp.dest('./dist/presentation'));
  done();
}

exports.default = defaultTask;
