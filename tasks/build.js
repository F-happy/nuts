/**
 * 在线上服务器上的部署命令
 * 这个命令不读取配置文件中的项目信息
 * 仅仅通过命令行的方式接收参数
 * Created by fuhuixiang on 2016-9-25.
 */
'use strict';

const fs            = require('fs'),
      path          = require('path'),
      task          = require('gulp'),
      sassPlugin    = require('gulp-sass'),
      renamePlugin  = require('gulp-rename'),
      plumberPlugin = require('gulp-plumber'),
      streamPlugin  = require('webpack-stream'),
      replacePlugin = require('gulp-replace-pro'),
      taskIf        = require('../utils/task_if'),
      printMes      = require('../utils/task_print'),
      getVersion    = require('../utils/get_now_version'),
      webConfig     = require('../utils/get_wp_config')('build'),
      config        = require(path.resolve(process.cwd(), 'nuts.config.json'));

module.exports = (buildDir, buildVer) => {
    // 获取命令行中的参数
    let devDir = `${config.sourceDir}/${buildDir}`;

    // 判断参数是否合法
    if (!!buildVer) {
        console.log('正在部署的版本:' + buildVer);
        outDist(buildDir, buildVer, devDir);
    } else {
        getVersion(buildDir, (result) => {
            console.log('正在部署的版本:' + result);
            outDist(buildDir, result, devDir);
        });
    }
};

/**
 * 通过命令行中的路径以及计算出最新版本号进行部署
 * @param buildDir
 * @param nowVersion
 * @param devDir
 */
function outDist(buildDir, nowVersion, devDir) {

    let distStaticDir = `${config.distDir}/${config.staticDir}/${buildDir}/${nowVersion}`,
        staticURL     = config.needCDN ? config.staticURL : `../${config.staticDir}`,
        buildCDNDir   = `${staticURL}/${buildDir}/${nowVersion}`,
        buildName     = path.basename(buildDir),
        styleType     = config.styleType === 'scss' ? 'scss' : 'css';

    // 部署并压缩javaScript脚本文件
    fs.readdir(`${devDir}/js`, (err) => {
        if (err) {
            console.log('js路径不存在');
        } else {
            task.src(`${devDir}/js/*.js`)
                .pipe(plumberPlugin())
                .pipe(taskIf(config.target === 'ES6', streamPlugin(webConfig)))
                .pipe(renamePlugin(`${buildName}.min.js`))
                .pipe(taskIf(config.needCDN, replacePlugin('(\.\.\/\i|\i)mages', `${buildCDNDir}/images`)))
                .pipe(replacePlugin({
                    '@@replace': config.replaceStr || ''
                }))
                .pipe(printMes('javascript'))
                .pipe(task.dest(`${distStaticDir}/js/`));
        }
    });

    // 部署需要用到的图片，若没有图片则目录不存在
    task.src(`${devDir}/images/**/*.*`)
        .pipe(printMes('image'))
        .pipe(task.dest(`${distStaticDir}/images/`));

    // 部署需要用到的字体文件，若没有字体文件则目录不存在
    task.src(`${devDir}/font/*.*`)
        .pipe(printMes('font'))
        .pipe(task.dest(`${distStaticDir}/font/`));

    // 部署并压缩需要用到的样式表文件，并且替换样式表中的本地资源为CDN资源
    fs.readdir(`${devDir}/${styleType}`, (err) => {
        if (err) {
            console.log(`${styleType}路径不存在`);
        } else {
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
            task.src(`${devDir}/${styleType}/*.${styleType}`)
                .pipe(printMes('css'))
                .pipe(plumberPlugin())
                .pipe(taskIf(styleType === 'scss', sassPlugin({
                    includePaths: inputList,
                    outputStyle: 'compressed'
                })))
                .pipe(taskIf(config.needCDN, replacePlugin({
                    '../images/': `${buildCDNDir}/images/`,
                    '../font/': `${buildCDNDir}/font/`
                })))
                .pipe(task.dest(`${distStaticDir}/css/`));
        }
    });

    // 部署html文件，并替换文件中的静态资源
    task.src(`${devDir}/*.html`)
        .pipe(printMes('html'))
        .pipe(replacePlugin({
            'href="css/': `href="${buildCDNDir}/css/`,
            'src="js/': `src="${buildCDNDir}/js/`,
            'src="images/': `src="${buildCDNDir}/images/`
        }))
        .pipe(task.dest(`${config.distDir}/${buildDir}/`));
}
