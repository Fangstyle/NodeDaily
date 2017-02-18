/**
 * Created by baocheng on 2017/2/17.
 */
const net = require('net');
var clients = {};
const server = net.createServer((socket) => {
    // 'connection' listener
    console.log('client connected');
    socket.on('end', () => {
        console.log('client disconnected');
    });
    socket.on('data', (data) => {
        console.log(data);
        var clientData = JSON.parse(data.toString().trim());
        swtichChatStyle(clientData);
    });
function swtichChatStyle(data){
    console.log(data);
    switch (data.type){
        case "signin":
            login(data);
            break;
        case "boardcast":
            broadcastToClient(data);
            break;
        case "private":
            sendToFrind(data);
            break;
        default:
            break;
    }
}
function login(data) {
    clients[data.from] = socket;
    console.log(`Welcome ${data.from} to 8124 chatroom 当前在线${Object.keys(clients).length}`);
}
function sendToFrind(signal) {
    var username = signal.from;
    var message = signal.message;
    var sendTo = signal.to;
    var send = {
        type: signal.type,
        to:sendTo,
        from: username,
        message: message
    };
    for(var item in clients){
        if (clients.hasOwnProperty(item) &&clients.hasOwnProperty(signal.to)) { //filter,只输出man的私有属性
            clients[item].write(JSON.stringify(send));
            //console.log(clients[item]);
        };
    }
}
function broadcastToClient(signal) {
    // console.log(signal);
    // 肯定有用户名和消息
    var username = signal.from;
    var message = signal.message;
    var sendTo = signal.to;
    // 我们要发给客户端的东西
    var send = {
        type: signal.type,
        from: username,
        message: message
    };
    console.log("runs broadcastToEveryOne" +signal.toString());
    /*    // 广播消息
     for (var froms in clients) {
     if (clients.hasOwnProperty(froms)) {
     var server = clients[froms];
     server.write(JSON.stringify(send));
     }
     }*/
    for(var item in clients){
        if (clients.hasOwnProperty(item)) { //filter,只输出man的私有属性
            clients[item].write(JSON.stringify(send));
            //console.log(clients[item]);
        };
    }
}
});

server.on('error', (err) => {
    throw err;
});
server.listen(8124, () => {
    console.log('server listenting');
});

