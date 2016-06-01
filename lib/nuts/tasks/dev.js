/**
 * 开启开发环境的任务
 * Created by jonnyf on 15-12-6.
 */

const config    = require('../main').config,
      defname   = require('../util/get_def_name'),
      fs        = require('fs'),
      connect   = require('gulp-connect'),
      minimist  = require('minimist'),
      plumber   = require('gulp-plumber'),
      compass   = require('gulp-compass'),
      rename    = require('gulp-rename'),
      gulp      = require('gulp'),
      webpack   = require('gulp-webpack'),
      webConfig = require('../main').webpackConfig('dev');

gulp.task('dev', ['server'], ()=> {
    let proName = minimist(process.argv.slice(2)).name || defname(),
        devDir  = config.sourceDir + '/' + proName;

    //初始化函数
    (()=> {
        fs.readdir(devDir + '/scss', (err)=> {
            if (err) {
                console.log('scss路径不存在');
            } else {
                _sass(devDir, devDir + '/scss/*.scss', devDir + '/css');
            }
        });
        fs.readdir(devDir + '/js', (err)=> {
            if (err) {
                console.log('js路径不存在');
            } else {
                es6ToEs5(devDir + '/js/src/*.js', devDir + '/js/', (config.activity == true) ? proName.split('/')[1] : proName);
            }
        });
    })();

    //监控样式表是否改动
    gulp.watch(devDir + '/scss/*.scss', ()=> {
        _sass(devDir, devDir + '/scss/*.scss', devDir + '/css');
    });

    //监控js代码是否改变
    gulp.watch(devDir + '/js/**/*.js', () => {
        es6ToEs5(devDir + '/js/src/*.js', devDir + '/js/', (config.activity == true) ? proName.split('/')[1] : proName);
    });

    // 监控静态文件是否变更
    gulp.watch(devDir + '/*.html', () => {
        gulp.src(devDir + '/*.html')
            .pipe(connect.reload());
    });
});

/**
 * 对项目中的scss文件进行编译
 * @param devDir
 * @param input
 * @param output
 * @private
 */
function _sass(devDir, input, output) {
    gulp.src(input)
        .pipe(plumber())
        .pipe(compass({
            css: devDir + '/css',
            sass: devDir + '/scss',
            image: devDir + '/images'
        }))
        .pipe(connect.reload())
        .pipe(gulp.dest(output));
}

/**
 * 更具项目来判断是否进行es6的转换
 * @param input
 * @param output
 * @param proName
 */
function es6ToEs5(input, output, proName) {
    gulp.src(input)
        .pipe(plumber())
        .pipe(webpack(webConfig))
        .pipe(rename(proName + '.min.js'))
        .pipe(connect.reload())
        .pipe(gulp.dest(output));
}
