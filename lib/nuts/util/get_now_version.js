/**
 * 获得当前部署的项目的最新版本
 * @param dir
 * @param callBack
 * Created by jonnyf on 2015-12-6.
 */

'use strict';

const fs     = require('fs'),
      config = require('../main').config;

module.exports = (dir, callBack) => {

    let inputDir     = config.distDir + '/' + config.staticDir + '/' + dir,
        _baseVersion = '';

    getBaesVsersion(inputDir, (baseVersion) => {
        _baseVersion = baseVersion;
        existDir(inputDir + '/' + baseVersion.join('.'));
    });

    /**
     * 判断并生成最新的版本目录
     * @param getDir
     */
    function existDir(getDir) {
        fs.exists(getDir, (exists) => {
            if (exists) {
                let newVer = getVersion();
                existDir(dir + '/' + newVer);
            } else {
                let result = _baseVersion.join('.');
                callBack(result);
            }
        });
    }

    /**
     * 判断当前最新的版本目录
     * @returns {string}
     */
    function getVersion() {
        if (_baseVersion[2] > 8) {
            _baseVersion[2] = 0;
            _baseVersion[1]++;
            if (_baseVersion[1] > 8) {
                _baseVersion[1] = 0;
                _baseVersion[0]++;
            }
        } else {
            _baseVersion[2]++;
        }
        return _baseVersion.join('.');
    }

    /**
     * 判断部署次数，并进行初始化目录
     * @param dir
     * @param callBack
     */
    function getBaesVsersion(dir, callBack) {
        fs.readdir(dir + '/', (err, files) => {
            let dirList = [],
                baseVersion;
            if (err) {
                console.log('第一次部署中...');
                fs.mkdir(dir, () => {
                    baseVersion = [1, 1, 1];
                    callBack(baseVersion);
                });
            } else {
                if (files.length == 0) {
                    files = ['1.1.1'];
                }
                console.log('部署目标已存在，正在更新中...');
                for (let i = 0; i < files.length; i++) {
                    dirList.push(files[i].replace(/\./g, ''));
                }
                baseVersion = Math.max.apply(null, dirList).toString().split('');
                callBack(baseVersion);
            }
        });
    }
};
