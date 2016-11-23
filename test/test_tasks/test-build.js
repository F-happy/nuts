/**
 * 部署任务的测试
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
            callback(null, 'create-build-init');
        });
        readStream.on('error', ()=> {
            throw new Error('copy config file error');
        });
    },
    (callback)=> {
        // 开始任务
        hasProject('test', ()=> {
            require('../../tasks/build')('test', '');
            require('../../tasks/build')('test', '1.2.0');
            callback(null, 'create-build');
        });
    }
], (err, results)=> {
    // 判断任务执行结果
    setTimeout(()=> {
        checkBuild('1.1.1');
        checkBuild('1.2.0');
    }, 3000);
    fs.unlinkSync('./nuts.config.json');
});

/**
 * 判断项目是否正确
 * @param name
 * @param callback
 */
function hasProject(name, callback) {
    const config = require(path.resolve(process.cwd(), 'nuts.config.json'));
    console.log(`${config.sourceDir}/${name}`);
    fs.exists(`${config.sourceDir}/${name}`, (exists)=> {
        if (exists) {
            callback();
        } else {
            console.log('项目不存在');
        }
    });
}

/**
 * 校验编译结果
 * @param num
 */
function checkBuild(num) {
    fs.readFile(path.resolve(process.cwd(), `./test/dist/static/test/${num}/css/test.css`), 'utf-8', (err, data)=> {
        let rg = new RegExp('http://cdn.jonnyf.com/images', "g");
        if (err || !rg.test(data)) {
            console.log(err);
            console.log(!rg.test(data));
            throw new Error('CSS 资源编译失败');
        }
    });
    fs.readFile(path.resolve(process.cwd(), `./test/dist/static/test/${num}/js/test.min.js`), 'utf-8', (err, data)=> {
        let rg = new RegExp('666', "g");
        if (err || !rg.test(data)) {
            throw new Error('JS 资源编译失败');
        }
    });
    fs.exists(path.resolve(process.cwd(), `./test/dist/static/test/${num}/images/test/test.png`), (exists)=> {
        if (!exists) {
            throw new Error('静态资源编译失败');
        }
    });
    fs.exists(path.resolve(process.cwd(), './test/dist/test/index.html'), (exists)=> {
        if (!exists) {
            throw new Error('HTML编译失败');
        }
    });
}
