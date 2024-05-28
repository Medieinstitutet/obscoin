import express from 'express';
import Blockchain from './models/Blockchain.mjs';
import PubNubServer from './pubnubServer.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
// import txRouter from './routes/tx-routes.mjs';

export const blockchain = new Blockchain();
export const pubnub = new PubNubServer({ blockchain });

const app = express();
app.use(express.json());

const PORT = +process.env.PORT || 5010;
const PRIMARY_NODE = `http://localhost:${PORT}`;

let nodePort =
  process.env.DYNAMIC_NODE_PORT === 'true'
    ? PORT + Math.floor(Math.random() * 1000)
    : PORT;

setTimeout(() => {
  pubnub.broadcast();
}, 1000);

app.use('/api/v1/obscoin/blockchain', blockchainRouter);
// app.use('/api/v1/obscoin/transactions', txRouter);

const syncBlockchain = async () => {
  try {
    const response = await fetch(`${PRIMARY_NODE}/api/v1/obscoin/blockchain`);

    if (response.ok) {
      const { data } = await response.json();
      blockchain.updateChain(data);
    } else {
      throw new Error('Failed to sync blockchain: Server response not OK');
    }
  } catch (error) {
    throw new Error(`Failed to sync blockchain: ${error.message}`);
  }
};

app.listen(nodePort, () => {
  console.log(`Server is running on port: ${nodePort}`);

  if (nodePort !== PORT) {
    syncBlockchain();
  }
});
