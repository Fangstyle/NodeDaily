/**
 * Created by Administrator on 2017/2/14.
 */
'use strict'
/*
* 默认加载文件为.js结尾所以不用加后缀
* */
/*require 请求方式一   填写相对路径*/
const moduleA = require('./01_requireModule/moduleA');
console.log(moduleA);

/*require 请求方式二   填写绝对路径*/
const moduleB = require('F:/WorkSpace/NodeDaily/01_requireModule/moduleB');
console.log(moduleB.say());

/*请求模式三  添加名称，加载核心模块*/
const http = require('http');
console.log(http);

/*require 请求方式四   node_moudle目录下-->填写名称*/
const moduleC = require('moduleC');
console.log(moduleC.say());