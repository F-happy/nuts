/**
 * 开启开发环境的任务
 * Created by fuhuixiang on 2016-9-25.
 */
"use strict";

const fs            = require('fs'),
      path          = require('path'),
      task          = require('gulp'),
      server        = require('./server'),
      sassPlugin    = require('gulp-sass'),
      connectPlugin = require('gulp-connect'),
      plumberPlugin = require('gulp-plumber'),
      renamePlugin  = require('gulp-rename'),
      streamPlugin  = require('webpack-stream'),
      replacePlugin = require('gulp-replace-pro'),
      taskIf        = require('../utils/task_if'),
      webConfig     = require('../utils/get_wp_config')('dev'),
      config        = require(path.resolve(process.cwd(), 'nuts.config.json'));
let devDirList = [],
    styleType  = 'css';

module.exports = (proName, port) => {

    let devDir    = `${config.sourceDir}/${proName}`,
        outDir    = `${config.devDir}/${proName}`,
        styleType = config.styleType === 'scss' ? 'scss' : 'css';

    server({name: proName, port: port}, () => {
        //初始化函数
        devDirList = fs.readdirSync(devDir);
        if (devDirList.indexOf(styleType) != -1) {
            compassStyle(`${devDir}/${styleType}/*.${styleType}`, `${outDir}/css`);
        } else {
            console.log(`${styleType}路径不存在`);
        }

        if (devDirList.indexOf('js') != -1) {
            es6ToEs5(`${devDir}/js/*.js`, `${outDir}/js`, path.basename(proName));
        } else {
            console.log('js路径不存在');
        }
        if (devDirList.indexOf('images') != -1) {
            compassFile(`${devDir}/images/**/*.*`, `${outDir}/images`);
        } else {
            console.log('图片路径不存在');
        }

        if (devDirList.indexOf('font') != -1) {
            compassFile(`${devDir}/font/*.*`, `${outDir}/font`);
        } else {
            console.log('字体路径不存在');
        }
        compassFile(`${devDir}/*.html`, outDir);

        // 监听文件变动
        taskWatch(devDir, outDir, proName);
    });
};

/**
 * 文件变动函数
 * @param devDir
 * @param outDir
 * @param proName
 */
function taskWatch(devDir, outDir, proName) {

    //监控js代码是否改变
    task.watch(`${devDir}/js/*.js`).on('all', (event, filePath, stats) => {
        console.log(`文件 ${filePath} 触发 ${event} 事件，重新编译中。。。`);
        es6ToEs5(filePath, `${outDir}/js`, path.basename(proName));
    });

    //监控样式表是否改动
    task.watch(`${devDir}/${styleType}/*.${styleType}`).on('all', (event, filePath, stats) => {
        console.log(`文件 ${filePath} 触发 ${event} 事件，重新编译中。。。`);
        compassSass(filePath, `${outDir}/css`);
    });

    // 监控静态文件是否变更
    task.watch(`${devDir}/*.html`).on('all', (event, filePath, stats) => {
        console.log(`文件 ${filePath} 触发 ${event} 事件，重新编译中。。。`);
        compassFile(filePath, outDir);
    });
}

/**
 * 对项目中的样式文件进行编译
 * @param input
 * @param output
 */
function compassStyle(input, output) {
    let sassList  = config.sassLib || [],
        inputList = [];
    sassList.forEach((v) => {
        if (!!path.parse(v).dir) {
            inputList.push(v);
        } else {
            try {
                inputList = inputList.concat(require(v).includePaths);
            } catch (err) {
                console.log(`没有找到 ${v} 库`);
            }
        }
    });
    task.src(input)
        .pipe(plumberPlugin())
        .pipe(taskIf(styleType === 'scss', sassPlugin({includePaths: inputList})))
        .pipe(connectPlugin.reload())
        .pipe(task.dest(output));
}

/**
 * 更具项目来判断是否进行es6的转换
 * @param input
 * @param output
 * @param proName
 */
function es6ToEs5(input, output, proName) {
    task.src(input)
        .pipe(plumberPlugin())
        .pipe(taskIf(config.target === 'ES6', streamPlugin(webConfig)))
        .pipe(renamePlugin(`${proName}.min.js`))
        .pipe(replacePlugin('@@replace', config.replaceStr || ''))
        .pipe(connectPlugin.reload())
        .pipe(task.dest(output));
}

/**
 * 静态文件的编译
 * @param input
 * @param output
 */
function compassFile(input, output) {
    task.src(input)
        .pipe(plumberPlugin())
        .pipe(connectPlugin.reload())
        .pipe(task.dest(output));
}
