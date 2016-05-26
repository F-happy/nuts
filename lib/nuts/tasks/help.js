/**
 * gulp 的帮助命令
 * Created by jonnyf on 15-12-23.
 */

'use strict';

const gulp     = require('gulp'),
      minimist = require('minimist');

gulp.task('help', () => {

    let _init_project = minimist(process.argv.slice(2)).init_project,
        _clean        = minimist(process.argv.slice(2)).clean,
        _dev          = minimist(process.argv.slice(2)).dev,
        _build        = minimist(process.argv.slice(2)).build;

    if (!!_init_project) {
        console.log('新建项目：');
        console.log('当没有传入参数时将读取config文件中的项目名称来作为默认的项目名称.');
        console.log('--name   N  : 项目名称,在src文件夹中生成的文件夹名称.');
        console.log('ps: 我们将检查新建的项目是否存在,同名项目仅能创建一次,不会覆盖.');
    } else if (!!_clean) {
        console.log('清理文件：');
        console.log('当没有传入参数时将读取config文件中的项目名称来作为默认的项目名称.');
        console.log('--name   N  : 项目名称,所要清理的项目名称.');
        console.log('ps: 我们将检查需要被清理的项目是否存在.');
    } else if (!!_dev) {
        console.log('开发命令：');
        console.log('当没有传入参数时将读取config文件中的项目名称来作为默认的开发路径.');
        console.log('--name   N  : 项目名称,具体需要开发的项目名称.');
        console.log('--port   N  : 端口号,开发环境下监听的端口号.');
        console.log('ps: 我们将在传入参数的时候去检测端口号是否被占用和项目是否存在.');
    } else if (!!_build) {
        console.log('编译项目：');
        console.log('当没有传入参数时将读取config文件中的项目名称来作为默认的开发路径.');
        console.log('--dir    Y  : 项目路径,具体需要编译的项目名称.');
        console.log('--ver    N  : 版本号,编译时生成的版本号.');
        console.log('ps: 我们将在传入参数的时候去检测项目是否存在,并且可以通过传参的方式设置版本号.');
    }else {
        console.log('参数说明：');
        console.log('init_project: 新建项目,参数通过config文件获取.');
        console.log('clean       : 清理文件,将清理开发环境下的无用文件.');
        console.log('dev         : 开发命令,启动当前环境下的开发模式.');
        console.log('build       : 编译项目,将开发环境下的代码编译为发布版本.');
        console.log('详细使用方式可通过 --命令 来进行查看. eg: --build');
    }

});
