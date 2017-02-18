const gulp = require('gulp');
const less = require('gulp-less');
const nodemon = require('gulp-nodemon');
const path = require('path');

gulp.task('comp-less', function() {
    return gulp.src('./src/less/*.less')
        .pipe(less({
            paths: path.resolve('src/', 'less/', 'imports')
        }))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('serve', ['comp-less'], function() {
    var opts = {
        script: 'bin/www',
        delayTime: 1,
        watch: ['*.less', 'src/**/*.less']
    }
    return nodemon(opts)
        .on('restart', function(evt) {
            console.log('Executing Gulp tasks...');
    });
});
