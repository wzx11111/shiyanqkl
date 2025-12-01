const P2p = require('./P2p.js');
const Blockchain = require('./Blockchain.js');
const express = require('express');
const cors = require('cors');

const blockchain = new Blockchain();
const p2p = new P2p(blockchain);


function cli(vorpal) {
    vorpal.use(welcome).use(connectCommand).use(discoverCommand).use(blockchainCommand).use(peersCommand).use(mineCommand).use(openCommand).use(apiCommand).delimiter('blockchain>>>>>>').show();

}
module.exports = cli;
function welcome(vorpal) {
    vorpal.log("welcome to blockchain cli");
    vorpal.log("help");
}

function connectCommand(vorpal) {
    vorpal.command('connect <host> <port>', "Connect to a new peer.eg: connect localhost 2727")
        .alias('c')
        .action(function (args, callback) {
            if (args.host && args.port) {
                try {
                    p2p.connectToPeer(args.host, args.port);
                } catch (err) {
                    this.log(err.message);
                }
            }
            callback();
        })
}

function discoverCommand(vorpal) {
    vorpal.command('discover', 'Discover new perrs from your connected peers.')
        .alias('d')
        .action(function (args, callback) {
            try {
                p2p.discoverPeers();
            } catch (err) {
                this.log(err.message);
            }
            callback();
        })
}

function blockchainCommand(vorpal) {
    vorpal.command('blockchain', 'see the current state of the blockchain.')
        .alias('bc')
        .action(function (args, callback) {
            this.log(blockchain);
            callback();
        })
}

function peersCommand(vorpal) {
    vorpal.command('peers', 'get the list of connected peers.')
        .alias('p')
        .action(function (args, callback) {
            p2p.forEach(peer => {
                this.log(`${peer.pxpPeer.socket._host}\n`);
            }, this);
            callback();
        })
}

function mineCommand(vorpal) {
    vorpal.command('mine <data>', 'Mine a new block.eg: mine "Hello World"')
        .alias('m')
        .action(function (args, callback) {
            if (args.data) {
                blockchain.mine(args.data);
                p2p.broadcastLatest();
            }
            callback();
        })
}

function openCommand(vorpal) {
    vorpal.command('open <port>', 'Open a port for p2p connections.eg: open 2727')
        .alias('o')
        .action(function (args, callback) {
            if (args.port) {
                if (typeof args.port === 'number') {
                    p2p.startServer(args.port);

                    this.log(`Listening on port ${args.port}`);
                } else {
                    this.log('Invalid port number');
                }
            }
            callback();
        })
}
function apiCommand(vorpal) {
  vorpal.command('api <port>', 'Start API server. eg: api 3001')
    .alias('a')
    .action(function (args, callback) {
      if (args.port) {
        initHttpServer(args.port);
      }
      callback();
    })
}
function initHttpServer(port) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/blocks', (req, res) => {
    res.send(blockchain.blocks);
  });

  app.post('/mineBlock', (req, res) => {
    const data = req.body.data;
    if (data === null) {
      res.status(400).send('data parameter is missing');
      return;
    }
    blockchain.mine(data);
    const newBlock = blockchain.latestBlock;
    p2p.broadcastLatest();
    res.send(newBlock);
  });

  app.get('/peers', (req, res) => {
    res.send(p2p.peers.map(s => {
      const host = s._peerInfo?.host || s.remoteAddress;
      const port = s._peerInfo?.port || s.remotePort;
      return `${host}:${port}`;
    }));
  });

  app.get('/mineInfo', (req, res) => {
    res.send({
      p2pPort: p2p.serverPort,
      apiPort: port,
      blockCount: blockchain.blockchain.length
    });
  });

  app.post('/addPeer', (req, res) => {
    p2p.connectToPeer(req.body.peer);
    res.send();
  });

  app.listen(port, () => {
    console.log('listening http on port: ' + port);
  });
}