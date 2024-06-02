import PubNub from 'pubnub';

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  NODES: 'NODES',
};

const credentials = {
  publishKey: process.env.PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
  secretKey: process.env.PUBNUB_SECRET_KEY,
  userId: 'dev-user',
};

class PubNubServer {
  constructor({ blockchain, nodePort }) {
    this.blockchain = blockchain;
    this.nodePort = nodePort;
    this.pubnub = new PubNub(credentials);
    this.nodes = [];

    this.subscribeChannels();
    this.addListener();
    this.broadcastNodeDetails();
  }

  broadcastNodeDetails() {
    const portMessage = { address: this.nodePort };
    try {
      this.pubnub.publish({
        channel: CHANNELS.NODES,
        message: JSON.stringify(portMessage),
      });
    } catch (err) {
      console.error(`Failed to publish nodes data, error: ${err}`);
    }
  }

  getNodes() {
    return this.nodes;
  }

  broadcast() {
    try {
      this.pubnub.publish({
        channel: CHANNELS.BLOCKCHAIN,
        message: JSON.stringify(this.blockchain.chain),
      });
      console.log('Successfully published blockchain data');
    } catch (err) {
      console.error(`Failed to publish blockchain data, error: ${err}`);
    }
  }

  subscribeChannels() {
    try {
      this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    } catch (err) {
      console.error(`Failed to subscribe to channels, error: ${err}`);
    }
  }

  addListener() {
    try {
      this.pubnub.addListener({
        message: (msgObj) => {
          this.handleMsg(msgObj);
        },
      });
    } catch (err) {
      console.error(`Error listening to incoming messages, error: ${err}`);
    }
  }

  handleMsg(msgObj) {
    try {
      const { channel, message } = msgObj; 
      const newChain = JSON.parse(message);

      if (channel === CHANNELS.BLOCKCHAIN) {
        this.blockchain.updateChain(newChain);
      } else if (channel === CHANNELS.NODES) {
        this.nodes.push(newChain);
      }
    } catch (err) {
      console.error(`Error in handleMsg:', ${err}`);
    }
  }
}
export default PubNubServer;
