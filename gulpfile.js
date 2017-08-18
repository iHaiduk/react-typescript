const exec = require('child_process').exec;
const gulp = require('gulp');
const fs = require('fs');
const resolve = require('path').resolve;
const nodemon = require('gulp-nodemon');
const deletefile = require('gulp-delete-file');

let style_js_remove = [];

fs.readdirSync(resolve(__dirname, "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        style_js_remove.push(name);
    }
});

gulp.task('------Development------');

gulp.task('backend', function (callback) {
    try {
        nodemon({
            script: './dist/server/index.js',
            ext: 'js css jpg png svg',
            watch: ['dist'],
            env: {
                'NODE_ENV': 'development'
            },
            ignore: [
                'node_modules/'
            ]
        });
    } catch (err) {
        console.error(err)
    }
});

gulp.task('------Production------');

gulp.task('prebuild', function (callback) {
    try {
        exec('npm run productionFrontend', function (err, stdout, stderr) {
            if(err != null) {
                callback(err);
                console.error(err);
                return
            }
            console.info(stdout);
            console.error(stderr);
            exec('npm run productionBackend', function (err, stdout, stderr) {
                if(err != null) {
                    callback(err);
                    console.error(err);
                    return
                }
                console.info(stdout);
                console.error(stderr);
                callback(err);
            });
        });
    } catch (err) {
        console.error(err)
    }
});

gulp.task('cleanServer', ['prebuild'], function () {
    gulp.src(['./dist/server/**/*.js',
        './dist/server/**/*.map',
        './dist/server/**/*.css'
    ]).pipe(deletefile({
        reg: /(index\.js$)|(manifest)/ig,
        deleteMatch: false
    }))
});

gulp.task('cleanPublic', ['cleanServer'], function () {
    gulp.src(['./dist/public/**/*.map', './dist/public/**/*.js']).pipe(deletefile({
        reg: new RegExp(style_js_remove.join("|"), "ig"),
        deleteMatch: true
    }))
});

gulp.task('cleanStyle', ['cleanPublic'], function () {
    gulp.src(['./dist/public/style/*.css']).pipe(deletefile({
        reg: new RegExp(style_js_remove.join("|"), "ig"),
        deleteMatch: false
    }))
});

gulp.task('build', ['cleanStyle']);