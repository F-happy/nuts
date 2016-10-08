/**
 * 获取 webpack 的配置文件,一般情况下不需要修改
 * Created by fuhuixiang on 2016-9-25.
 */
"use strict";

const webpack = require('webpack');

module.exports = (devType)=> {
    let _preset = null;
    // 判断当前环境来加载对应的插件
    try {
        _preset = require.resolve('../../babel-preset-es2015');
    } catch (err) {
        _preset = require.resolve('../node_modules/babel-preset-es2015')
    }
    return {
        watch: false,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: require.resolve('babel-loader'),
                    exclude: require('path').resolve(__dirname, '../node_modules/'),
                    query: {
                        presets: [_preset]
                    }
                }
            ]
        },
        plugins: (devType == 'dev') ? [] : [new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }), new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),]
    }
};
