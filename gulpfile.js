const gulp = require('gulp');

function defaultTask(done) {
  gulp.src([
    'Presentation/**/*',
    'Presentation/**/*'
  ], { "base" : "Presentation" })
  .pipe(gulp.dest('./Release/Presentation'));
  done();
}

exports.default = defaultTask;
