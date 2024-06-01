import PubNub from 'pubnub';

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  NODES: 'NODES',
};

// TODO make sure this works first, I think we need cross-env
// otherwise uninstall cross-env
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
      console.log('Successfully published nodes data');
    } catch (err) {
      console.error(`Failed to publish nodes data, error: ${err}`);
    }
  }

  getNodes() {
    console.log(this.nodes);
    return this.nodes;
  }

  // Publish Blockchain data (public)
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

  // Subscribe to channels and recieve messages
  subscribeChannels() {
    try {
      this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
      // console.log(`Successfully subscribed to channels: ${Object.values(CHANNELS)}`);
    } catch (err) {
      console.error(`Failed to subscribe to channels, error: ${err}`);
    }
  }

  // When message is recieved on subscribeChannels() :
  // Executes callback in to listen for incoming messages
  addListener() {
    try {
      this.pubnub.addListener({
        message: (msgObj) => {
          // Use an arrow function to preserve `this` context
          this.handleMsg(msgObj);
        },
      });
    } catch (err) {
      console.error(`Error listening to incoming messages, error: ${err}`);
    }
  }

  handleMsg(msgObj) {
    try {
      const { channel, message } = msgObj; // Extract incoming msgs
      const newChain = JSON.parse(message);

      // console.log(`Blockchain: ${message} received on channel: ${channel}`);
      if (channel === CHANNELS.BLOCKCHAIN) {
        this.blockchain.updateChain(newChain);
      } else if (channel === CHANNELS.NODES) {
        this.nodes.push(newChain);
        // console.log('nodesArray -----', this.nodes);
      }
    } catch (err) {
      console.log(`Error in handleMsg:', ${err}`);
    }
  }
}
export default PubNubServer;
