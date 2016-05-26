/**
 * Created by fuhuixiang on 16/5/26.
 */
'use strict';
let fs      = require('fs'),
    path    = require('path'),
    program = require('commander'),
    stat    = fs.stat;

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

program
    .allowUnknownOption()
    .usage(' <command>');

program
    .command('setup')
    .description('开始安装构建工具')
    .action(()=> {
        // 复制目录
        exists(path.resolve(__dirname, './lib'), process.cwd(), copy);
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help()
}

if (process.argv[2] != 'setup' &&
    process.argv[2] != 'init'
) {
    program.help()
}
