const exec = require('child_process').exec;
const gulp = require('gulp');
const fs = require('fs');
const resolve = require('path').resolve;
const nodemon = require('gulp-nodemon');
const deletefile = require('gulp-delete-file');
const svgo = require('gulp-svgo');
const watch = require('gulp-watch');
const tinypng = require('gulp-tinypng');

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
            watch: ['./dist/server/'],
            env: {
                'NODE_ENV': 'development',
                'STATIC_PATH': 'dist/public'
            },
            ignore: [
                'node_modules/'
            ]
        });

    } catch (err) {
        console.error(err)
    }
});

gulp.task('watchImages', () => {
    return watch('./static/original_images/**/*.{png,jpg,jpeg}', () => {
        gulp.start('tinypng');
    });
});

gulp.task('svgSprite', (callback) => {

    exec('./node_modules/.bin/svg-sprite-generate -d ./static/icon/ -o ./dist/public/sprite.svg', (err, stdout, stderr) => {
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

gulp.task('svgoDev', ['svgSprite'], () => {

    return gulp.src('./dist/public/*.svg', { ignoreInitial: false })
        .pipe(svgo({
            plugins: [
                {removeAttrs: {attrs: ['class', 'fill', 'viewBox']}},
                {removeUselessDefs: true},
                {removeDoctype: true},
                {removeStyleElement: true},
                {removeComments: true},
                {cleanupIDs: false},
                {removeViewBox: true},
                {removeRasterImages: true},
                {sortAttrs: true},
                {mergePaths: true},
                {removeTitle: true},
                {removeDesc: true},
                {removeScriptElement: true},
                {cleanupNumericValues: { floatPrecision: 3 }},
                {addAttributesToSVGElement:{attribute: ['viewBox="0 0 24 24"']}}
            ]
        }))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('------Production------');



gulp.task('tinypng', function () {
    gulp.src('./static/original_images/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            apiKey: ['RsN84oBjmXxPkCB5s_ZlfA1fRS1U32LY', 'bN4uZbaI06-ESRiKhD6yS3P4NF9zle7W', 'durCxw2lwQgJmxvwOnpyLrMdEsNEImOY'],
            cached: true
        }))
        .pipe(gulp.dest('./static/images'));
});

gulp.task('prebuild', ['tinypng'], (callback) => {
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
                {removeAttrs: {attrs: ['class', 'fill', 'viewBox']}},
                {removeUselessDefs: true},
                {removeDoctype: true},
                {removeStyleElement: true},
                {removeComments: true},
                {cleanupIDs: false},
                {removeViewBox: true},
                {removeRasterImages: true},
                {sortAttrs: true},
                {mergePaths: true},
                {removeTitle: true},
                {removeDesc: true},
                {removeScriptElement: true},
                {cleanupNumericValues: { floatPrecision: 3 }},
                {addAttributesToSVGElement:{attribute: ['viewBox="0 0 24 24"']}}
            ]
        }))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('build', ['svgo']);