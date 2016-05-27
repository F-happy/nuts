/**
 * 仅仅只读取js后最的文件作为gulp的脚本
 * @param name
 * @returns {boolean}
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const path = require('path');

module.exports = (name) => {
    return /(\.(js)$)/i.test(path.extname(name));
};
