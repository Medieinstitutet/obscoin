import express from 'express';
import cors from 'cors';
import Blockchain from './models/Blockchain.mjs';
import PubNubServer from './pubnubServer.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import txRouter from './routes/tx-routes.mjs';
import pubnubRouter from './routes/pubnub-routes.mjs'

const PORT = +process.env.PORT || 5010;
const PRIMARY_NODE = `http://localhost:${PORT}`;

let nodePort =
  process.env.DYNAMIC_NODE_PORT === 'true' ? PORT + Math.floor(Math.random() * 1000) : PORT;

export const blockchain = new Blockchain();
export const pubnub = new PubNubServer({ blockchain, nodePort });

const app = express();
app.use(express.json());
app.use(cors());

setTimeout(() => {
  pubnub.broadcast();
}, 1000);
pubnub.getNodes();

app.use('/api/v1/obscoin/blockchain', blockchainRouter);
app.use('/api/v1/obscoin/transactions', txRouter);
app.use('/api/v1/obscoin/nodes', pubnubRouter )

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
