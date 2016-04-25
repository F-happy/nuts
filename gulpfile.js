/**
 * 这个项目使用gulp构建
 */

'use strict';

const config = {
    // 判断是否启动ES6模式
    'es6': true,

    // 判断是否是活动项目
    'activity': false,

    // 本地开发服务器监听的端口号
    'serverPort': 2333,

    // 开发环境中的源码路径
    'sourceDir': 'src',

    // 需要部署的目标路径
    'distDir': 'dist',

    // 目标路径中静态文件需要放置的目录
    'staticDir': 'static',

    // 开发环境中需要开发的项目名称
    'name': 'test',

    // 项目作者
    'author': 'jonnyf',

    // 公共基础库
    'baseLibrary': 'base_library/',

    // 默认的CDN路径
    'staticURL': 'http://cdn.jonnyf.com/duobao-activity'
};

//引入gulp的入口文件
let nuts = require('./nuts/main');

nuts.config = config;

nuts.run();
