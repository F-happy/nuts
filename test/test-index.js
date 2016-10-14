/**
 * Created by fuhuixiang on 16-10-13.
 */
"use strict";

const fs = require('fs');

fs.readdir(`${__dirname}/test_tasks`, (err, files)=> {
    if (err) {
        console.log('not found routers');
    } else {
        files.forEach((file)=> {
            require(`${__dirname}/test_tasks/${file}`);
        });
    }
});

// require(`${__dirname}/test_tasks/test-include`);
