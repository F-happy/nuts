/**
 * 从初始化文件夹中复制出需要用到的html，scss和js文件
 * 这个命令只在初始化一个项目时使用，需要本地模板文件支持，其他同事请无视这条命令，谢谢！
 * Created by jonnyf on 15-12-1.
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
                fs.exists(config.baseLibrary, (exists) => {
                    if (exists) {
                        initProject(config.baseLibrary, devDir, name);
                    } else {
                        initProject('nuts/baseFiles/', devDir, name);
                    }
                });
            }
        });
    } else {
        console.log('警告！！！这是一个需要完整路径的项目!');
    }
});

/**
 * 创建新项目的函数
 * @param baseFiles
 * @param devDir   项目路径
 * @param name     项目名称
 */
function initProject(baseFiles, devDir, name) {

    gulp.src(baseFiles + "index.html")
        .pipe(replace('@@main', name))
        .pipe(gulp.dest(devDir + '/'));

    gulp.src(baseFiles + "/scss/_base.scss")
        .pipe(gulp.dest(devDir + '/scss'));

    gulp.src(baseFiles + "/scss/_reset.scss")
        .pipe(gulp.dest(devDir + '/scss'));

    gulp.src(baseFiles + "/scss/main.scss")
        .pipe(rename(name + '.scss'))
        .pipe(gulp.dest(devDir + '/scss'));

    gulp.src(baseFiles + "/js/main.js")
        .pipe(replace('@@project_name', name))
        .pipe(replace('@@author', config.author))
        .pipe(replace('@@date', time))
        .pipe(rename(name + '.js'))
        .pipe(gulp.dest(devDir + '/js/src'));

    gulp.src(baseFiles + "/images/o.png")
        .pipe(gulp.dest(devDir + '/images'));

    console.log(name + '项目创建完成！！！');
}
