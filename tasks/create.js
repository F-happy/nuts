/**
 * 从初始化文件夹中复制出需要用到的html，scss和js文件
 * Created by fuhuixiang on 2016-9-23.
 */
"use strict";
const fs            = require('fs'),
      path          = require('path'),
      task          = require('gulp'),
      renamePlugin  = require('gulp-rename'),
      replacePlugin = require('gulp-replace-pro'),
      timeFormat    = require('../utils/date_format'),
      mkdirs        = require('../utils/mkdirs'),
      templetPath   = path.join(__dirname, '../templates/'),
      config        = require(path.resolve(process.cwd(), 'nuts.config.json'));

module.exports = (projectName)=> {
    let _devDir = `${config.sourceDir}/${projectName}`;
    fs.exists(_devDir, (exists)=> {
        if (exists) {
            console.log('警告！！！您要创建的项目已经存在！');
            return null;
        } else {
            let create = createProject(_devDir, path.basename(projectName));
            create.next();
            console.log('HTML文件创建完成！！！');
            create.next();
            console.log('样式文件创建完成！！！');
            create.next();
            console.log('脚本文件创建完成！！！');
            if (create.next().done) {
                console.log(`${projectName}项目创建完成！！！`);
            }
        }
    });
};

/**
 * 创建新项目的函数
 * @param devDir   项目路径
 * @param name     项目名称
 */
function* createProject(devDir, name) {

    let letterName = name.replace(/\_(\w)/g, (all, letter)=> {
        return letter.toUpperCase();
    });

    yield task.src(`${templetPath}/index.html`)
        .pipe(replacePlugin({
            '@@main': name,
            '@@title': config.title
        }))
        .pipe(task.dest(`${devDir}/`));

    let styleType = config.styleType === 'scss' ? 'scss' : 'css';

    yield task.src(`${templetPath}/${styleType}/main.${styleType}`)
        .pipe(renamePlugin(`${name}.${styleType}`))
        .pipe(task.dest(`${devDir}/${styleType}`));

    yield task.src(`${templetPath}/js/main.tmpl`)
        .pipe(replacePlugin({
            '@@project_name': name,
            '@@author': config.author,
            '@@date': timeFormat,
            '@@project': letterName.replace(/(\w)/, v=> v.toUpperCase()),
            '@@letter': letterName
        }))
        .pipe(renamePlugin(`${name}.js`))
        .pipe(task.dest(`${devDir}/js`));

    // 创建图片和字体文件夹
    return mkdirs(path.resolve(process.cwd(), devDir), (dir)=> {
        fs.mkdirSync(`${dir}/images`);
        fs.mkdirSync(`${dir}/font`);
    });
}
