/**
 * 开启开发环境的任务
 * 自动监听任务，检测各个文件的变化
 * Created by jonnyf on 2016-04-26.
 */

const config   = require('../main').config,
      defname  = require('../util/get_def_name'),
      connect  = require('gulp-connect'),
      minimist = require('minimist'),
      plumber  = require('gulp-plumber'),
      compass  = require('gulp-compass'),
      babel    = require("gulp-babel"),
      rename   = require('gulp-rename'),
      gulp     = require('gulp');

gulp.task('dev', ['server'], ()=>{

    let proName = minimist(process.argv.slice(2)).name || defname(),
        devDir  = config.sourceDir + '/' + proName;

    //初始化函数
    (()=> {
        _sass(devDir);
        es6ToEs5(devDir, proName);
    })();

    //监控样式表是否改动
    gulp.watch(devDir + '/scss/*.scss', ()=> {
        _sass(devDir);
    });

    //监控js代码是否改变
    gulp.watch(devDir + '/js/**/*.js', () => {
        es6ToEs5(devDir, proName);
    });

    // 监控静态文件是否变更
    gulp.watch(devDir + '/*.html', () => {
        gulp.src(devDir + '/*.html')
            .pipe(connect.reload());
        // .pipe(gulp.dest(devDir + '/'));
    });
});

/**
 * 对项目中的scss文件进行编译
 * @param devDir
 * @private
 */
function _sass(devDir) {
    gulp.src(devDir + '/scss/*.scss')
        .pipe(plumber())
        .pipe(compass({
            css: devDir + '/css',
            sass: devDir + '/scss',
            image: devDir + '/images'
        }))
        .pipe(connect.reload())
        .pipe(gulp.dest(devDir + '/css'));
}

/**
 * 更具项目来判断是否进行es6的转换
 * @param devDir
 * @param proName
 */
function es6ToEs5(devDir, proName) {
    if (config.es6) {
        gulp.src(devDir + '/js/es6/*.js')
            .pipe(plumber())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(rename(proName.split('/')[1] + '.min.js'))
            .pipe(connect.reload())
            .pipe(gulp.dest(devDir + '/js/'));
    } else {
        gulp.src(devDir + '/js/*.js')
            .pipe(plumber())
            .pipe(rename(proName.split('/')[1] + '.min.js'))
            .pipe(connect.reload());
    }
}
