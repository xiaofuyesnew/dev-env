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
 * @update  2017-04-01
 *     made new Promise instand of callback function
 *     back to pure gulp env
 * 
 * 
 */

const gulp = require('gulp')    //gulp main module
const babel = require('gulp-babel')     //babel module
const rename = require('gulp-rename')   //rename module
const sass = require('gulp-sass')   //sass module
const sync = require('gulp-file-sync')  //file-sync module
const uglify = require('gulp-uglify')   //uglify module
const pump = require('pump')    //uglify need this

//browser-sync and its reload
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

/**s
 * copy lib files and images to dist 
 */
gulp.task('copy', () => {
    gulp.src('src/lib/js/*.js')
        .pipe(gulp.dest('dist/static/lib/js'))
    gulp.src('src/lib/css/*.css')
        .pipe(gulp.dest('dist/static/lib/css'))
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/static/image'))
})

gulp.task('tpl', () => {
    
})

gulp.task('dev', ['copy'])

gulp.task('build', ['copy'])