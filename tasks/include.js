/**
 * 引入静态资源任务
 * Created by fuhuixiang on 2016-9-25.
 */
"use strict";

const fs            = require('fs'),
      path          = require('path'),
      task          = require('gulp'),
      replacePlugin = require('gulp-replace-pro'),
      firFiles      = require('../utils/get_dir_file'),
      config        = require(path.resolve(process.cwd(), 'nuts.config.json'));

module.exports = (proName)=> {

    let devDir       = `${config.sourceDir}/${proName}`,
        firstInclude = true,
        _staticData  = '';

    if (!proName) {
        console.log('请输入项目名称');
        return null;
    }

    /**
     * 读取 images 文件夹下所有的文件的相对路径,
     * 然后通过正则匹配出文件名,然后新建出静态资源文件进行存储
     * 最后在主 scss 文件中引入新建的静态资源文件。
     */
    firFiles(`${devDir}/images/`, (err, files)=> {
        _staticData = '@charset "utf-8";\n';
        if (err) {
            console.log(`${err.path}目录不存在`);
            return null;
        }
        fs.readFile(`${devDir}/scss/_static.scss`, 'utf8', (err, data)=> {
            if (!err) {
                _staticData = data.toString();
                firstInclude = false;
            }
            files.forEach((v)=> {
                let _name     = v.split(`${devDir}/images/`)[1],
                    writeText = `$nuts_${_name.match(/(\w+)\.\w+$/)[1].replace(/_/g, '-')}: url(../images/${_name}); \n`;
                if (_staticData.indexOf(writeText) === -1) {
                    _staticData += writeText;
                }
            });
            if (!!_staticData) {
                fs.writeFile(`${devDir}/scss/_static.scss`, _staticData, 'utf8', (err)=> {
                    if (err) {
                        console.log(err);
                    } else if (firstInclude) {
                        console.log('_static文件创建完成');
                        task.src(`${devDir}/scss/${path.basename(proName)}.scss`)
                            .pipe(replacePlugin({
                                '@charset "utf-8";': `@charset "utf-8";\n@import "static";`,
                            }))
                            .pipe(task.dest(`${devDir}/scss/`));
                    }
                });
            } else {
                console.log(`目录内没有静态资源`);
            }
        });
    });
};
