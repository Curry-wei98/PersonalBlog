const gulp = require('gulp'),
    // babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    fs = require("fs"),
    browserify = require("browserify"),
    babelify = require("babelify"),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util');
const src = {
    js: 'src/Plugin/js/*.js',
    css: 'src/Plugin/css/*.scss',
    file: 'src/**/*.html',
    img: 'src/Image/**/*'
};


gulp.task('copyJs', function () {
    browserify({debug: true})
        .transform("babelify", {presets: ["es2015"]})
        .require("src/Plugin/js/index.js", {entry: true})
        .bundle()
        .on('error',gutil.log)
        .pipe(source('index.js'))
        .pipe(gulp.dest('dist/Plugin/js/'))
        .pipe(livereload());
});

gulp.task('es6', function () {
    return gulp.src('src/Plugin/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .on("error", error => {
            console.log(error);
        })
        .pipe(gulp.dest('dist/Plugin/js/'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    return gulp.src('src/Plugin/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/Plugin/css'))
        .pipe(livereload());
});

gulp.task('copyFile', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('copyImage', function () {
    return gulp.src('src/Image/**/*')
        .pipe(gulp.dest('dist/Image/'));
});

gulp.task('watch', ['copyJs', 'sass', 'copyFile', 'copyImage'], function () {
    livereload.listen();
    gulp.watch(src.js, ['copyJs']);
    gulp.watch(src.css, ['sass']);
    gulp.watch(src.file, ['copyFile']);
});

gulp.task('default', ['watch']);