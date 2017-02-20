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
var httpServer = http.createServer((req,res)=>{
    var urlList = url.parse(req.url);
/*    for(var item in urlList){   url.parse(req.url)到底是啥？
        if(urlList.hasOwnProperty(item)){
            console.log(`key is :${item} + value is : ${urlList[item]}`);
        }
    }*/
    var pathName = urlList.pathname;
    var htocs = path.join(__dirname,'static',pathName); //创建web根目录
    var extendName = path.extname(htocs);
    fs.readFile(htocs,(err,data)=>{
        if(err){
            res.writeHead('404',{"Content-type":"text/html;charset=UTF8"});
            console.log("文件不存在"+err);
            res.end();
        }else{
            res.writeHead('200',{"Content-type":"text/html;charset=UTF8"});
            console.log("文件存在");
            res.end(data);
        }
    });
});

httpServer.listen('8090',()=>{
    console.log('链接成功');
});

function getMimeType(key) {
    // 传入.html  返回Mime类型 ：text/html
    
}