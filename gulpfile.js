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
 *     
 */

const gulp = require('gulp')    //gulp main module
const babel = require('gulp-babel')     //babel module
const htmlminify = require('gulp-html-minify') //htmlminify module
const cleanCSS = require('gulp-clean-css')   //clean css module
const inject = require('gulp-inject')    //inject module
const rename = require('gulp-rename')   //rename module
const sass = require('gulp-sass')   //sass module
const uglify = require('gulp-uglifyjs')   //uglify module

//browser-sync and its reload
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

gulp.task('cpimg', () => {
    return gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/static/image'))
})

gulp.task('cpimg:dev', () => {
    return gulp.src('src/image/*.*')
        .pipe(gulp.dest('dev/static/image'))
        .pipe(reload({stream: true}))
})

gulp.task('cpjs', () => {
    return gulp.src('src/lib/dist/js/*.js')
        .pipe(gulp.dest('dist/static/lib/js'))
})

gulp.task('cpjs:dev', () => {
    return gulp.src('src/lib/dev/js/*.js')
        .pipe(gulp.dest('dev/static/lib/js'))
        .pipe(reload({stream: true}))
})

gulp.task('cpcss', () => {
    return gulp.src('src/lib/dist/css/*.css')
        .pipe(gulp.dest('dist/static/lib/css'))
})

gulp.task('cpcss:dev', () => {
    return gulp.src('src/lib/dev/css/*.css')
        .pipe(gulp.dest('dev/static/lib/css'))
        .pipe(reload({stream: true}))
})

//compile and uglify js
gulp.task('js', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/js'))
})

//complie and copy js files
gulp.task('js:dev', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dev/static/js'))
        .pipe(reload({stream: true}))
})

//sass compile with compressed
gulp.task('sass', () => {
    return setTimeout(() => {
        gulp.src('src/style/sass/*.scss')
            .pipe(sass({outputStyle: 'compressed'})
                .on('error', sass.logError))
            .pipe(gulp.dest('dist/static/css'))
    }, 500)
})

//sass compile without compressed
gulp.task('sass:dev', () => {
    return setTimeout(() => {
        gulp.src('src/style/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dev/static/css'))
            .pipe(reload({stream: true}))
    }, 500)
})

//css copy with compressed
gulp.task('css', () => {
    return gulp.src('src/style/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/static/css'))
})

//css copy without compressed
gulp.task('css:dev', () => {
    return gulp.src('src/style/css/*.css')
        .pipe(gulp.dest('dev/static/css'))
        .pipe(reload({stream: true}))
})

//html copy with compressed
gulp.task('tpl', () => {
    return gulp.src('src/tpl/*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('dist'))
})

//html copy without compressed
gulp.task('tpl:dev', () => {
    return gulp.src('src/tpl/*.html')
        .pipe(gulp.dest('dev'))
        .pipe(reload({stream: true}))
})

gulp.task('dev', [
    'cpimg:dev', 
    'cpjs:dev', 
    'cpcss:dev',  
    'js:dev', 
    'sass:dev', 
    'css:dev', 
    'tpl:dev'], () => {
        browserSync.init({
            server: {
                baseDir: "./dev"
            },
            notify: false
        })
        gulp.watch('src/image/*.*', ['cpimg:dev'])
        gulp.watch('src/lib/dev/js/*.js', ['cpjs:dev'])
        gulp.watch('src/lib/dev/css/*.css', ['cpcss:dev'])
        gulp.watch('src/script/*.js', ['js:dev'])
        gulp.watch('src/style/sass/*.scss', ['sass:dev'])
        gulp.watch('src/style/css/*.css', ['css:dev'])
        gulp.watch('src/tpl/*.html', ['tpl:dev'])
    })

gulp.task('build', [
    'cpimg', 
    'cpjs', 
    'cpcss', 
    'js', 
    'sass', 
    'css', 
    'tpl'])