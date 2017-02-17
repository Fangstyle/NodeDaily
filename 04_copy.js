/**
 * Created by Administrator on 2017/2/16.
 */
'use strict'
const fs = require('fs');
const path = require('path');
let currentPath = path.join(__dirname, process.argv[2] || "./lyrics.lrc");
var readStream = fs.createReadStream(currentPath);
var writer = fs.createWriteStream(path.join(__dirname, '/data/legend.lrc'));
fs.stat(currentPath, (err, stats) => { // 一个文件的详情信息
    if(stats){
        var readTotal = 0;
        readStream.on('data', (chunk) => {
            writer.write(chunk, (error) => {
            let currentProcess = readTotal + chunk.length;
        console.log(`写进度+${currentProcess / stats.size * 100}%`);
    });

    });

    }
})
;
