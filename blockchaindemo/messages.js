const messageType = require('./messages-type');
const  {
    REQUEST_LATEST_BLOCK,
    RECEIVE_LATEST_BLOCK,
    REQUEST_LATEST_BLOCKCHAIN,
    RECEIVE_LATEST_BLOCKCHAIN,
    HANDSHAKE
} = messageType;
class Message {
    static getLatestBlock(){
        return {
            type: REQUEST_LATEST_BLOCK,
        }
    } 
    static sendLatestBlock(block){
        return {
            type: RECEIVE_LATEST_BLOCK,
            data: block
        }
    }
    static getBlockchain(){
        return {
            type: REQUEST_LATEST_BLOCKCHAIN,
        };
    }
    static sendBlockchain(blockchain){
        return {
            type: RECEIVE_LATEST_BLOCKCHAIN,
            data: blockchain
        };
    }
    static sendHandshake(port){
        return {
            type: HANDSHAKE,
            data: port
        };
    }
}
module.exports = Message;