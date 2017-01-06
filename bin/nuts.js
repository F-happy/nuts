#!/usr/bin/env node

"use strict";

const fs         = require('fs'),
      path       = require('path'),
      minimist   = require('minimist')(process.argv.slice(2)),
      configPath = path.resolve(process.cwd(), 'nuts.config.json');

// taskController(require(configPath));

fs.exists(configPath, (exists)=> {
    if (exists) {
        let nutsPath = path.resolve(process.cwd(), './node_modules/wishbao/bin');

        // 优先使用本地模块
        if (nutsPath == __dirname){
            taskController(require(configPath));
        } else {
            require(path.resolve(process.cwd(), './node_modules/wishbao/bin/nuts'))();
        }
    } else {
        if (minimist['_'][0] == 'init') {
            require('../tasks/init')(configPath);
        } else {
            console.log('未检测到配置文件，请先执行 init 命令创建配置文件');
        }
    }
});

/**
 * 任务分发模块
 * @param config
 */
function taskController(config) {
    const taskName = minimist['_'][0];
    const {name, port, ver, dir, update} = minimist;

    switch (taskName) {
        case 'create':
            require('../tasks/create')(name || config.name);
            break;
        case 'init':
            require('../tasks/init')(configPath, update);
            break;
        case 'include':
            require('../tasks/include')(name);
            break;
        case 'clean':
            require('../tasks/clean')(name);
            break;
        case 'dev':
            hasProject(name, ()=> {
                require('../tasks/dev')(name, port || config.serverPort);
            });
            break;
        case 'build':
            hasProject(dir, ()=> {
                require('../tasks/build')(dir, ver);
            });
            break;
        default:
            console.log('没有这个任务!');
            break;
    }
}

/**
 * 判断项目是否正确
 * @param name
 * @param callback
 */
function hasProject(name, callback) {
    const config = require(path.resolve(process.cwd(), 'nuts.config.json'));
    fs.exists(`${config.sourceDir}/${name}`, (exists)=> {
        if (exists) {
            callback();
        } else {
            console.log('项目不存在');
        }
    });
}

/**
 * 暴露自身模块
 */
module.exports = ()=> {
    console.log('Nuts 开始运行~');
};
