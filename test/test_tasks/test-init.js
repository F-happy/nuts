/**
 * 初始化配置文件测试
 * Created by fuhuixiang on 16-10-13.
 */
"use strict";

const fs         = require('fs'),
      path       = require('path'),
      async      = require('async'),
      configPath = path.resolve(process.cwd(), './test/test-init-config.json');

async.series([
    (callback)=> {
        // 开始任务
        require('../../tasks/init')(configPath);
        callback(null, 'init');
    }
], (err, results)=> {
    // 判断任务执行结果
    fs.exists(configPath, (exists)=> {
        if (!exists) {
            throw new Error('配置文件创建失败');
        } else {
            if (require(configPath).author !== 'jonnyf') {
                throw new Error('配置文件创建失败');
            }
            fs.unlinkSync(configPath);
        }
    });
});
