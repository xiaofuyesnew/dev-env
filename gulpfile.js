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
 */

const gulp = require('gulp')    //gulp main module
const webpack = require('webpack')      //wenpack module
const config = require('./webpack.config')  //webpack config module


gulp.task('webpack', (cb) => {
    return webpack(config, () => {
        cb()
    })
})