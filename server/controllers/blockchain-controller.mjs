import { blockchain, pubnub } from '../server.mjs';

export const listBlocks = (req, res) => {
  res.status(200).json({
    data: {
      chain: blockchain.chain,
      pendingTransactions: blockchain.pendingTransactions,
    },
  });
};

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

export const getLastBlock = (req, res) => {
  const lastBlock = blockchain.chain[blockchain.chain.length - 1];

  res.status(200).json({
    data: lastBlock,
  });
};

export const addBlock = (req, res) => {
  const newBlock = blockchain.addBlock();

  res.status(201).json({
    data: newBlock,
  });

  pubnub.broadcast();
};
