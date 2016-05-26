/**
 * 在线上服务器上的部署命令
 * 这个命令不读取配置文件中的项目信息
 * 仅仅通过命令行的方式接收参数
 * Created by jonnyf on 2015/12/4.
 */

'use strict';

const gulp       = require('gulp'),
      compass    = require('gulp-compass'),
      plumber    = require('gulp-plumber'),
      replace    = require('gulp-replace'),
      rename     = require('gulp-rename'),
      minimist   = require('minimist'),
      uglify     = require('gulp-uglify'),
      fs         = require('fs'),
      webpack    = require('gulp-webpack'),
      prinMes    = require('../util/print_mesages'),
      getVersion = require('../util/get_now_version'),
      config     = require('../config.js');

gulp.task('build', () => {

    // 获取命令行中的参数
    let buildDir = minimist(process.argv.slice(2)).dir,
        devDir   = config.sourceDir + '/' + buildDir,
        buildVer = minimist(process.argv.slice(2)).ver;

    // 判断参数是否合法
    if (!!buildDir) {
        fs.exists(devDir, (exists) => {
            if (exists) {
                if (!!buildVer) {
                    console.log('正在部署的版本:' + buildVer);
                    outDist(buildDir, buildVer);
                } else {
                    getVersion(buildDir, (result) => {
                        console.log('正在部署的版本:' + result);
                        outDist(buildDir, result);
                    });
                }
            } else {
                console.log('警告！！！没有您要部署的项目！');
            }
        });
    } else {
        console.log('请输入需要部署的活动路径!');
        return null;
    }

});

/**
 * 通过命令行中的路径以及计算出最新版本号进行部署
 * @param buildDir
 * @param nowVersion
 */
function outDist(buildDir, nowVersion) {

    let distStaticDir = config.distDir + '/static/' + buildDir + '/' + nowVersion + '/',
        buildCDNDir   = config.staticURL + '/' + buildDir + '/' + nowVersion,
        distHtmlDir   = config.distDir + '/' + buildDir,
        devDir        = config.sourceDir + '/' + buildDir;

    // 部署html文件，并替换文件中的静态资源
    gulp.src(devDir + '/*.html')
        .pipe(prinMes('html'))
        .pipe(replace('href="css/', 'href="' + buildCDNDir + '/css/'))
        .pipe(replace('src="js/', 'src="' + buildCDNDir + '/js/'))
        .pipe(replace('src="images/', 'src="' + buildCDNDir + '/images/'))
        .pipe(gulp.dest(distHtmlDir + '/'));

    // 部署并压缩javascrpt脚本文件
    gulp.src(devDir + '/js/src/*.js')
        .pipe(plumber())
        .pipe(replace('../images/', buildCDNDir + '/images/'))
        .pipe(replace('images/', buildCDNDir + '/images/'))
        .pipe(webpack({
            watch: false,
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        }))
        .pipe(uglify())
        .pipe(rename(buildDir + '.min.js'))
        .pipe(prinMes('javascript'))
        .pipe(gulp.dest(distStaticDir + '/js/'));

    // 部署需要用到的图片，若没有图片则目录不存在
    gulp.src(devDir + '/images/**/*.*')
        .pipe(prinMes('image'))
        .pipe(gulp.dest(distStaticDir + '/images/'));

    // 部署需要用到的字体文件，若没有字体文件则目录不存在
    gulp.src(devDir + '/font/*.*')
        .pipe(prinMes('font'))
        .pipe(gulp.dest(distStaticDir + '/font'));

    // 部署并压缩需要用到的样式表文件，并且替换样式表中的本地资源为CDN资源
    gulp.src(devDir + '/scss/*.scss')
        .pipe(prinMes('css'))
        .pipe(plumber())
        .pipe(compass({
            css: distStaticDir + '/css',
            sass: devDir + '/scss',
            image: devDir + '/images',
            style: 'compressed'
        }))
        .pipe(replace('../images/', buildCDNDir + '/images/'))
        .pipe(replace('../font/', buildCDNDir + '/font/'))
        .pipe(gulp.dest(distStaticDir + '/css/'));

    console.log('部署成功！！！');
}
