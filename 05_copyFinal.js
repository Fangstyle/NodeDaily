/**
 * Created by Administrator on 2017/2/16.
 */
'use strict'
/*利用管道思想 copy复制*/
const fs = require('fs');
const path = require('path');
let currentPath = path.join(__dirname, process.argv[2] || "./lyrics.lrc");
var readStream = fs.createReadStream(currentPath);
var writer = fs.createWriteStream(path.join(__dirname, '/data/legend_pipe.lrc'));
writer.on('pipe', (src) => {
     /*on方法为了测试*/
    // console.log(src === reader);  true
});
readStream.pipe(writer);
