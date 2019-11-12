const gulp = require('gulp');

function defaultTask(done) {
  gulp.src([
    'Presentation/**/*',
    'Presentation/**/*'
  ], { "base" : "Presentation" })
  .pipe(gulp.dest('./dist/Presentation'));
  done();
}

exports.default = defaultTask;
