var gulp = require('gulp');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');

var CSScomb = require('less-plugin-csscomb');
var cssCP = new CSScomb("zen");

var AutoPrefix = require('less-plugin-autoprefix');
var autoPP = new AutoPrefix({
  browsers: ["last 2 versions"]
});

var path = require('path');

gulp.task('comp-less', function() {
  gulp.src('src/less/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'src', 'less', 'imports')]
    }))
    .pipe(gulp.dest('public/stylesheets/less'))
});

gulp.task('start', function() {
  nodemon({
      script: 'bin/www',
      ext: 'less js html',
      tasks: ['comp-less'],
      plugins: [cssCP, autoPP]
    })
    .on('restart', function() {
      console.log('Compiling less files...');
    });
})
