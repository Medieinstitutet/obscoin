import { blockchain, pubnub } from '../server.mjs';

// Method for listing all blocks in the blockchain...
export const listBlocks = (req, res) => {
  res.status(200).json({
    data: {
      chain: blockchain.chain,
      pendingTransations: blockchain.pendingTransactions,
    },
  });
};

// Method for listing a single block by its index...
export const getBlock = (req, res) => {
  const { index } = req.params;
  const block = blockchain.chain.find((block) => block.index === +index);

  if (block) {
    res.status(200).json({
      data: block,
    });
  } else {
    res.status(404).json({
      error: 'Block not found',
    });
  }
};

// Method for listing the last block in the blockchain...
export const getLastBlock = (req, res) => {
  const lastBlock = blockchain.chain[blockchain.chain.length - 1];

  res.status(200).json({
    data: lastBlock,
  });
};

// Method for adding a new block to the blockchain...
export const addBlock = (req, res) => {
  const newBlock = blockchain.addBlock();

  res.status(201).json({
    data: newBlock,
  });

  pubnub.broadcast();
};
