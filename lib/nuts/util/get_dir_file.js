/**
 * 通过传入的地址将其中的中文文件删除
 * @param dir
 * Created by jonnyf on 2015-12-4.
 */

'use strict';

const fs   = require('fs'),
      path = require('path');

module.exports = (dir) => {

    /**
     * 遍历后的回调函数，将路径中中文的文件删除
     * @param err
     * @param files
     */
    walk(dir, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].match(/[\u4E00-\u9FA5\uF900-\uFA2D]/)) {
                fs.unlinkSync(files[i]);
            }
        }
        if (typeof err !== null) {
            console.log('清除完成！');
        } else {
            console.log(err);
        }
    });
};

/**
 * 遍历整个项目目录，将文件通过数组的方式返回
 * @param dir
 * @param done
 */
function walk(dir, done) {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) {
            return done(err);
        }

        if (!list.length) {
            return done(null, results)
        }

        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, (err, res) => {
                        results = results.concat(res);
                        if (!--(list.length)) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--(list.length)) {
                        done(null, results);
                    }
                }
            });
        });
    });
}
