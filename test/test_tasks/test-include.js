/**
 * include 命令测试
 * Created by fuhuixiang on 16-10-14.
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
        require('../../tasks/include')('test');
        callback(null, 'test-include');
    }
], (err, results)=> {
    // 判断任务执行结果
    setTimeout(()=> {
        let outDir = './test/test_dev/test/scss/';
        fs.exists(path.resolve(process.cwd(), `${outDir}_static.scss`), (exists)=> {
            if (!exists) {
                throw new Error('include 命令执行失败');
            }
        });
        fs.readFile(path.resolve(process.cwd(), `${outDir}test.scss`), 'utf-8', (err, data)=> {
            let rg = new RegExp('@import "static";', "g");
            if (err || !rg.test(data)) {
                throw new Error('include 命令执行失败');
            }
        });
    }, 3000);
});
