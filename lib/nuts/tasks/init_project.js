/**
 * 从初始化文件夹中复制出需要用到的html，scss和js文件
 * 这个命令只在初始化一个项目时使用，需要本地模板文件支持，其他同事请无视这条命令，谢谢！
 * Created by jonnyf on 2016-04-26.
 */

'use strict';

const config   = require('../main').config,
      gulp     = require('gulp'),
      replace  = require('gulp-replace'),
      rename   = require('gulp-rename'),
      minimist = require('minimist'),
      fs       = require('fs'),
      defname  = require('../util/get_def_name'),
      time     = require('../util/date_format');

gulp.task('init_project', () => {

    let proName = minimist(process.argv.slice(2)).name || defname(),
        devDir  = config.sourceDir + '/' + proName,
        name    = config.activity ? proName.split('/')[1] : proName;

    if (!!name) {
        fs.exists(devDir, (exists) => {
            if (exists) {
                console.log('警告！！！您要创建的项目已经存在！');
            } else {
                initProject(devDir, name);
            }
        });
    } else {
        console.log('警告！！！这是一个需要完整路径的项目!');
    }
});

/**
 * 创建新项目的函数
 * @param devDir   项目路径
 * @param name     项目名称
 */
function initProject(devDir, name) {
    gulp.src(config.baseLibrary + "index.html")
        .pipe(replace('@@main', name))
        .pipe(gulp.dest(devDir + '/'));

    gulp.src(config.baseLibrary + "/scss/_base.scss")
        .pipe(gulp.dest(devDir + '/scss'));

    gulp.src(config.baseLibrary + "/scss/_reset.scss")
        .pipe(gulp.dest(devDir + '/scss'));

    gulp.src(config.baseLibrary + "/scss/main.scss")
        .pipe(rename(name + '.scss'))
        .pipe(gulp.dest(devDir + '/scss'));

    gulp.src(config.baseLibrary + "/js/main.js")
        .pipe(replace('@@project_name', name))
        .pipe(replace('@@author', config.author))
        .pipe(replace('@@date', time))
        .pipe(rename(name + '.js'))
        .pipe(gulp.dest(devDir + (config.es6 ? '/js/es6' : '/js')));

    gulp.src(config.baseLibrary + "/images/o.png")
        .pipe(gulp.dest(devDir + '/images'));

    console.log(name + '项目创建完成！！！');
}
