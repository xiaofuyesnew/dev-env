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
 * 
 * 
 */

const gulp = require('gulp')    //gulp main module
const webpack = require('webpack')      //wenpack module
const config = require('./webpack.config')  //webpack config module

//task webpack: using webpack to deal with resourses
//command: gulp webpack
gulp.task('webpack', () => {
    return new Promise((resolve, reject) => {
        webpack(config, () => {
            resolve()
        })
    })
})