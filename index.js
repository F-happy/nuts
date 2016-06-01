/**
 * Created by fuhuixiang on 16/5/26.
 */
'use strict';
const fs       = require('fs'),
      path     = require('path'),
      minimist = require('minimist'),
      stat     = fs.stat;

let _build   = minimist(process.argv.slice(2)).build,
    _release = minimist(process.argv.slice(2)).release;

if (!!_build) {
    // 复制目录
    exists(path.resolve(__dirname, './lib'), process.cwd(), copy);
}

if (!!_release){
    exists('./nuts', './lib/nuts', copy);
}

/**
 * 复制目录中的所有文件包括子目录
 * @param src   需要复制的目录
 * @param dst   复制到指定的目录
 */
function copy(src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, (err, paths)=> {
        if (err) {
            throw err;
        }

        paths.forEach((path)=> {
            let _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;

            stat(_src, (err, st)=> {
                if (err) {
                    throw err;
                }

                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                } else if (st.isDirectory()) {    // 如果是目录则递归调用自身
                    exists(_src, _dst, copy);
                }
            });
        });
    });
}

/**
 * 判断路径是否存在
 * @param src
 * @param dst
 * @param callback
 */
function exists(src, dst, callback) {
    fs.exists(dst, (exists)=> {
        // 已存在
        if (exists) {
            callback(src, dst);
        } else {  // 不存在
            fs.mkdir(dst, ()=> {
                callback(src, dst);
            });
        }
    });
}
