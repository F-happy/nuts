/**
 * Created by fuhuixiang on 2017-2-20.
 */
"use strict";
const fs = require('fs');
const through = require('through2');

module.exports = () => {
    // 返回文件 stream
    return through.obj(function (file, enc, done) {
        let nowTime = new Date();
        fs.utimes(file.path, nowTime, nowTime, done);
    })
};
