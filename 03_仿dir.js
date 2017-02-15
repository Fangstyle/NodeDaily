/**
 * Created by Administrator on 2017/2/15.
 */
'use strict'
const fs = require('fs');
const path = require('path');
var targetPath = path.join(__dirname, process.argv[2] || './');
function printDir(targetPath,depth) {
    // depth  0 = ''
    // depth  1 = '│ '
    // depth  2 = '│ │ '
    var prefix = new Array(depth + 1).join('│ '); //如果为目录 则想前增加制表符 表示子目录
    var dirList = fs.readdirSync(targetPath);
    var dirs = [];
    var files = [];
    dirList.forEach((item) => {
        let state = fs.statSync(path.join(targetPath, item));
    if (state.isFile()) {
        files.push(item);
    } else {
        dirs.push(item);
    }
});

    dirs.forEach(dirs => { //如果是目录就进行递归 直到dirs集合中为空 不走forEach函数跳出循环
        console.log(`${prefix}├─${dirs}`);
    printDir(path.join(targetPath, dirs),depth+1);
});
    var count = files.length - 1;
    files.forEach(file => {
        var temp = count-- ? '├' : '└';
    console.log(`${prefix}${temp}─${file}`);
});


}

printDir(targetPath,0);

