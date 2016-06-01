/**
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const fs      = require('fs'),
      webpack = require('webpack'),
      path    = require('path');

exports.config = {};
exports.webpack = {};

exports.webpackConfig = (dev)=> {
    return {
        watch: dev == 'dev',
        module: {
            loaders: [this.webpack]
        },
        plugins: (dev == 'dev') ? [] : [new webpack.optimize.UglifyJsPlugin()]
    }
};

exports.run = ()=> {
    fs.readdirSync('./nuts/tasks/').forEach((files) => {
        if (/(\.(js)$)/i.test(path.extname(files))) {
            require('./tasks/' + files);
        }
    });
};
