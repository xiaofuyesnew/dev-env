/**
 * @filename    gulpfile.js
 * 
 * @create  2017-03-31
 * 
 * @author  Allen Wong
 * 
 * @description
 *     gulpfile for gulp config
 * 
 * @update  2017-03-31
 *     require necessary modules and add normal functions
 *     mix with webpack
 * 
 * @update  2017-04-01
 *     made new Promise instand of callback function
 *     back to pure gulp env
 * 
 * @update  2017-04-05
 *     add detail functions and browserSync surpport
 */

const gulp = require('gulp')    //gulp main module
const babel = require('gulp-babel')     //babel module
const htmlminify = require('gulp-html-minify') //htmlminify module
const cleanCSS = require('gulp-clean-css')   //clean css module
const rename = require('gulp-rename')   //rename module
const sass = require('gulp-sass')   //sass module
const uglify = require('gulp-uglifyjs')   //uglify module

//browser-sync and its reload
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

//copy lib files and images to dist 
gulp.task('copy', () => {
    gulp.src('src/lib/js/*.js')
        .pipe(gulp.dest('dist/static/lib/js'))
    gulp.src('src/lib/css/*.css')
        .pipe(gulp.dest('dist/static/lib/css'))
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/static/image'))
})

//copy lib files and images to build
gulp.task('copy:dev', () => {
    gulp.src('src/lib/js/*.js')
        .pipe(gulp.dest('build/static/lib/js'))
    gulp.src('src/lib/css/*.css')
        .pipe(gulp.dest('build/static/lib/css'))
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('build/static/image'))
})

//compile and uglify js
gulp.task('js', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('dist/static/js'))
})

//complie and copy js files
gulp.task('js:dev', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/static/js'))
})

//sass compile with compressed
gulp.task('sass', () => {
    return setTimeout(() => {
        gulp.src('src/style/sass/*.scss')
            .pipe(sass({outputStyle: 'compressed'})
                .on('error', sass.logError))
            .pipe(rename((path) => {
                path.basename += '.min'
            }))
            .pipe(gulp.dest('dist/static/css'))
    }, 500)
})

//sass compile without compressed
gulp.task('sass:dev', () => {
    return setTimeout(() => {
        gulp.src('src/style/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('build/static/css'))
    }, 500)
})

//css copy with compressed
gulp.task('css', () => {
    return gulp.src('src/style/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename((path) => {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('dist/static/css'))
})

//css copy without compressed
gulp.task('css:dev', () => {
    return gulp.src('src/style/css/*.css')
        .pipe(gulp.dest('build/static/css'))
})

//html copy with compressed
gulp.task('tpl', () => {
    return gulp.src('src/tpl/*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('build'))
})

//html copy without compressed
gulp.task('tpl:dev', () => {
    return gulp.src('src/tpl/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('dev', [
    'copy:dev', 
    'js:dev', 
    'sass:dev', 
    'css:dev', 
    'tpl:dev'])

gulp.task('build', [
    'copy', 
    'js', 
    'sass', 
    'css', 
    'tpl'])