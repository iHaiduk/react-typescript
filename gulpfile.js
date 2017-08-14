
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('------Development------');

gulp.task('backend', function (callback) {
    try {
        nodemon({
            script: './dist/server/index.js',
            ext: 'js css jpg png svg',
            watch: ['dist'],
            env: {'NODE_ENV': 'development'},
            ignore: [
                'node_modules/'
            ]
        });
    } catch (err) {
        console.error(err)
    }
});