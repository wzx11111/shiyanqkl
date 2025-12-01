const net = require('net');
const Blcokchain = require('./Blockchain.js');
const P2p = require('./P2p.js');
const { type } = require('os');

console.log("========P2p测试开始========");

const blcokchain = new Blcokchain();

const p2p = new P2p(blcokchain);

try {
    console.log('1.测试p2p实例创建:');
    console.log('---p2p实例类型：',typeof p2p);
    console.log('---p2p实例是否为对象：', typeof p2p === 'object' && p2p !== null);
    console.log('---p2p实例是否有startServer方法：', typeof p2p.startServer === 'function');
    console.log('---p2p实例是否有connectToPeer方法：', typeof p2p.connectToPeer === 'function');
    console.log('---p2p实例是否有broadcast方法：', typeof p2p.broadcast === 'function');
    console.log('p2p实例创建成功\n');


    console.log('2.测试服务器启动：');
    console.log('---p2p类是否具有strartServer方法：', typeof p2p.startServer === 'function');
    console.log('服务器启动方法存在\n');

    console.log('3.测试节点连接功能：');
    console.log('---p2p类具有connectToPeer方法：', typeof p2p.connectToPeer === 'function');
    console.log('节点连接方法存在\n');

    console.log('4.测试广播功能：');
    console.log('---p2p类具有broadcast方法：', typeof p2p.broadcast === 'function');
    console.log('---p2p类具有broadcastLatest方法：', typeof p2p.broadcastLatest === 'function');
    console.log('广播方法存在\n');

    console.log('5.测试区块链同步功能：');
    console.log('---p2p类具有handleMessage方法：', typeof p2p.handleMessage === 'function');
    console.log('---p2p类具有handleReceivedBlockchain方法：', typeof p2p.handleReceivedBlockchain === 'function');
    console.log('---p2p类具有handleReceivedLatestBlock方法：', typeof p2p.handleReceivedLatestBlock === 'function');

    console.log('p2p网络基础测试通过========================');
} catch(e) {
    console.log(e);
}
