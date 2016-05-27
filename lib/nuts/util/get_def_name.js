/**
 * 返回默认的创建路径
 * Created by jonnyf on 16-1-12.
 */

'use strict';

const config = require('../main').config;

module.exports = () => {
    return config.activity ? new Date().getFullYear() + '/' + config.name : config.name;
};
