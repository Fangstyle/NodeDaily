/**
 * Created by Administrator on 2017/2/20.
 */
/*
本地静态服务器，类似appahe 输入127.0.0.1:30/index.html可以找到index文件、
*/
const url = require('url');
const path = require('path');
const http = require('http');
const fs = require('fs');
/*下面两句 是讲一个二进制流文件 转化为一个utf-8的一个字符串*/
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
//decoder.write("二进制流")
var httpServer = http.createServer((req,res)=>{
    var urlList = url.parse(req.url);
/*    for(var item in urlList){   url.parse(req.url)到底是啥？
        if(urlList.hasOwnProperty(item)){
            console.log(`key is :${item} + value is : ${urlList[item]}`);
        }
    }*/
    var pathName = urlList.pathname;
    var LocalHtocs = path.join(__dirname,'static',pathName); //创建web根目录
    var extendName = path.extname(LocalHtocs);
    getMimeType(extendName,LocalHtocs,res);

});
httpServer.listen('8090',()=>{
    console.log('链接成功');
});

function getMimeType(type,LocalHtocs,res) {
    // 传入.html  返回Mime类型 ：text/html
    fs.readFile(path.join(__dirname,"static/mime.json"),(err,data)=>{
        var stringMime = decoder.write(data);
        var objMime = JSON.parse(stringMime);
        for(let item in objMime){
            if (objMime.hasOwnProperty(item)&&type==item){
                var targetMime =  objMime[item].toString();
                responseToLocal(LocalHtocs,res,targetMime);
            }
        }
    });
}
function responseToLocal(LocalHtocs,res,targetMime) {
    fs.readFile(LocalHtocs,(err,data)=>{
        if(err){
            res.writeHead('404',{"Content-type":"text/html;charset=UTF8"});
            console.log("文件不存在"+err);
            res.end();
        }else{

            res.writeHead('200',{"Content-type":targetMime});
            console.log(targetMime);
            res.end(data);
        }
    });
}