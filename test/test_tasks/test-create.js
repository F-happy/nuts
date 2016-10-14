/**
 * 创建新项目的测试
 * Created by fuhuixiang on 16-10-13.
 */
"use strict";
const fs    = require('fs'),
      path  = require('path'),
      async = require('async');

async.series([
    (callback)=> {
        let readStream = fs.createReadStream(path.resolve(process.cwd(), './test/test-config.json'));
        readStream.pipe(fs.createWriteStream('./nuts.config.json'));
        readStream.on('end', ()=> {
            callback(null, 'create-init');
        });
        readStream.on('error', ()=> {
            throw new Error('copy config file error');
        });
    },
    (callback)=> {
        // 开始任务
        require('../../tasks/create')('test_1');
        callback(null, 'create-test1');
    },
    (callback)=> {
        // 开始任务
        require('../../tasks/create')('test_dir/test');
        callback(null, 'create-test2');
    }
], (err, results)=> {
    // 判断任务执行结果
    setTimeout(()=> {
        fs.exists(path.resolve(process.cwd(), './test/test_dev/test_1/js/test_1.js'), (exists)=> {
            if (!exists) {
                throw new Error('项目创建失败');
            }
        });
        fs.exists(path.resolve(process.cwd(), './test/test_dev/test_dir/test/js/test.js'), (exists)=> {
            if (!exists) {
                throw new Error('项目创建失败');
            }
        });
    }, 3000);
});
