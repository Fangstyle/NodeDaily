/**
 * Created by baocheng on 2017/2/17.
 */
const net = require('net');
const server = net.createServer((socket) => {
    // 'connection' listener
    console.log('client connected');
    socket.on('end', () => {
        console.log('client disconnected');
    });
    socket.write('hello\r\n');
    //c.pipe(c);
    socket.on('data', (data) => {
        console.log(data.toString());
    });
});

server.on('error', (err) => {
    throw err;
});
server.listen(8124, () => {
    console.log('server listenting');
});