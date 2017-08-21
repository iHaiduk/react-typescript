const exec = require('child_process').exec;
const gulp = require('gulp');
const fs = require('fs');
const resolve = require('path').resolve;
const nodemon = require('gulp-nodemon');
const deletefile = require('gulp-delete-file');
const svgo = require('gulp-svgo');
const watch = require('gulp-watch');

let style_js_remove = [];

fs.readdirSync(resolve(__dirname, "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        style_js_remove.push(name);
    }
});

gulp.task('------Development------');

gulp.task('backend', () => {
    try {
        gulp.watch('./dist/public/*.svg', { ignoreInitial: false }, ['svgoDev']);

        return nodemon({
            script: './dist/server/index.js',
            ext: 'js',
            watch: ['./dist/server/index.js'],
            env: {
                'NODE_ENV': 'development',
                'STATIC_PATH': '../dist/public'
            },
            ignore: [
                'node_modules/'
            ]
        });

    } catch (err) {
        console.error(err)
    }
});


gulp.task('svgoDev', () => {

    return gulp.src('./dist/public/*.svg', { ignoreInitial: false })
        .pipe(svgo({
            plugins: [
                {removeAttrs: {attrs: ['class', 'fill']}},
                {removeUselessDefs: true},
                {removeDoctype: true},
                {removeStyleElement: true},
                {removeComments: true},
                {cleanupNumericValues: { floatPrecision: 2 }}
            ]
        }))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('------Production------');

gulp.task('prebuild', (callback) => {
    try {
        exec('npm run productionFrontend', (err, stdout, stderr) => {
            if(err != null) {
                callback(err);
                console.error(err);
                return
            }
            console.info(stdout);
            console.error(stderr);
            exec('npm run productionBackend', (err, stdout, stderr) => {
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

gulp.task('cleanServer', ['prebuild'], () => {
    gulp.src(['./dist/server/**/*.js',
        './dist/server/**/*.map',
        './dist/server/**/*.css'
    ]).pipe(deletefile({
        reg: /(index\.js$)|(manifest)/ig,
        deleteMatch: false
    }))
});

gulp.task('cleanPublic', ['cleanServer'], () => {
    gulp.src(['./dist/public/**/*.map', './dist/public/**/*.js']).pipe(deletefile({
        reg: new RegExp(style_js_remove.join("|"), "ig"),
        deleteMatch: true
    }))
});

gulp.task('cleanStyle', ['cleanPublic'], () => {
    gulp.src(['./dist/public/style/*.css']).pipe(deletefile({
        reg: new RegExp(style_js_remove.join("|"), "ig"),
        deleteMatch: false
    }))
});


gulp.task('svgo', ['cleanStyle'], () => {

    return gulp.src(['./dist/public/*.svg'])
        .pipe(svgo({
            plugins: [
                {removeAttrs: {attrs: ['class', 'fill']}},
                {removeUselessDefs: true},
                {removeDoctype: true},
                {removeStyleElement: true},
                {removeComments: true},
                {cleanupNumericValues: { floatPrecision: 2 }}
            ]
        }))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('build', ['svgo']);