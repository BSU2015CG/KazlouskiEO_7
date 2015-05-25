var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('open', function(){
    gulp.src('./index.html')
    .pipe(open('', {
        url:'http://localhost:8080/index.html',
        arr: 'google-chrome'
    }));
})

gulp.task('default', ['connect', 'open']);