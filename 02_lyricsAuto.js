/**
 * Created by baocheng on 2017/2/15.
 */
/*根据歌曲时间输出歌词*/
'use strict'
const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname,'./lyrics.lrc'),(error,dataBuffer)=>{
    let data = dataBuffer.toString();
    let lineList = data.split('\n');
    let firstTime = new Date().getTime();
    let regx = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;
    lineList.forEach((item)=>{
        let matches =  regx.exec(item);
        if (matches){
            var m = parseFloat(matches[1]);
            var s = parseFloat(matches[2]);
            var f = parseFloat(matches[3]);
            var lyric = matches[4];
        }else {
            console.log(item);
        }
        let current = new Date().getTime();
        let offsetTime = current-firstTime;
        console.log("-------------------------");/*此处先将非阻塞应用执行完成后  将setTimeOut函数放入执行队列中执行*/
        setTimeout(()=>{
            console.log(lyric);
        },m * 60 * 1000 + s * 1000 + f - offsetTime);
    });

});