/**
 * 通过传入的地址返回其中的所有文件路径
 * @param dir
 * Created by fuhuixiang on 2016-9-25.
 */
'use strict';

const fs   = require('fs'),
      path = require('path');

module.exports = (dir, callback) => {

    /**
     * 遍历后的回调函数
     * @param err
     * @param files
     */
    walk(dir, (err, files) => {
        callback(err, files);
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
