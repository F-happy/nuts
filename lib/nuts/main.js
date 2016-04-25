/**
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const fs          = require('fs'),
      onlyScripts = require('./util/task_filter'),
      tasks       = fs.readdirSync('./nuts/tasks/').filter(onlyScripts);

exports.config = {};

exports.run = function () {
    tasks.forEach((task) => {
        require('./tasks/' + task);
    });
};
