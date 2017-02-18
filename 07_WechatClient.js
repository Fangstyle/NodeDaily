/**
 * Created by baocheng on 2017/2/17.
 */
const net = require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name? ', (name) => {
    name = name.trim();
if (!name) {
    throw new Error('没名字还出来混。。');
}
const client = net.connect({port: 8124}, () => {
        var user = {
            type: 'signin',
            from: name
        }
        client.write(JSON.stringify(user));
    console.log('connected to server!');
});
client.on('data', (data) => {
    try {
        var signal = JSON.parse(data.toString().trim());
        var type = signal.type;
switch (type) {
    case 'boardcast':
        console.log('\nboardcast[' + signal.from + ']> ' + signal.message + '\n');
        rl.prompt();
        break;
    case 'privat':
        if(name.equal(signal.to)){
            console.log('\nprivate[' + signal.from + ']> ' + signal.message + '\n');
        }
    default:
        client.write('弄啥咧！你要干的我干不了');
        break;
}
} catch (error) {
    console.log(error);
}
});

rl.setPrompt(name + '> '); // 此时没有写到控制台

rl.prompt(); // 写入控制台

// 输入一行内容敲回车
rl.on('line', (line) => {

    // {"procotol":"boardcast","from":"张三","message":"弄啥咧！"}
    var send = {
        type: 'boardcast',
        from: name,
        message: line.toString().trim()
    };
client.write(JSON.stringify(send));

rl.prompt();

});

client.on('end', () => {
    console.log('disconnected from server');
});
});