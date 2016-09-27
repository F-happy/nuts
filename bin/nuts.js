#!/usr/bin/env node

"use strict";

const fs         = require('fs'),
      path       = require('path'),
      minimist   = require('minimist')(process.argv.slice(2)),
      configPath = path.resolve(process.cwd(), 'nuts.config.json');

fs.exists(configPath, (exists)=> {
    if (exists) {
        try {
            require(path.resolve(process.cwd(), '../node_modules/wishbao'));
        } catch (err) {
            taskController(require(configPath));
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
    const {name, port, ver, dir} = minimist;

    switch (taskName) {
        case 'create':
            require('../tasks/create')(name || config.name);
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
