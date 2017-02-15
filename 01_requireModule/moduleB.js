/**
 * Created by Administrator on 2017/2/14.
 */

/*如果希望模块根导出为一个函数（比如构造函数）或一次导出一个完整的对象
而不是每次都创建一个属性，可以把它赋值给 module.exports 而不是 exports。*/

'use strict'
module.exports = {
    say:()=>{
        console.log('moduleB');
    }
}