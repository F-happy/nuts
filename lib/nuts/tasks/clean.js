/**
 * 在最后一次的提交代码中自动过滤代码中的中文文件
 * 这个特性还在开发中，暂时仅仅删除开发中的css文件夹，删除中文文件的功能还未实现
 * Created by jonnyf on 2015-12-4.
 */

'use strict';

const gulp       = require('gulp'),
      del        = require('del'),
      minimist   = require('minimist'),
      fs         = require('fs'),
      delChinese = require('../util/get_dir_file'),
      defname    = require('../util/get_def_name'),
      config     = require('../main').config;

gulp.task('clean', (cb) => {

    let proName = minimist(process.argv.slice(2)).name || defname(),
        devDir  = config.sourceDir + '/' + proName;

    fs.exists(devDir, (exists) => {
        if (exists) {
            delChinese(config.sourceDir);
            del([devDir + '/css'], cb);
            del([devDir + '/js/*.min.js'], cb);
        } else {
            console.log('请检查参数,您所要清理的项目不存在！');
        }
    });
});
