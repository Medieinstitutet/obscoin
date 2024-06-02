import Transaction from './Transaction.mjs';
import computeHash from '../utils/crypto-lib.mjs';
import Block from '../models/Block.mjs';
import PubNubServer from '../pubnubServer.mjs';

const GENESIS_BLOCK = {
  timestamp: 1,
  lastHash: '0',
  hash: '0',
  index: 0,
  data: [
    {
      amount: 0,
      recipient: 'Genesis Block',
      sender: 'Genesis Block',
    },
  ],
};
export default class Blockchain {
  constructor() {
    this.chain = [GENESIS_BLOCK];

    this.pendingTransactions = [];
  }

  addBlock() {
    const latestBlock = this.getLatestBlock();
    const timestamp = Date.now();
    const lastHash = latestBlock.hash;
    const index = latestBlock.index + 1;
    const data = this.pendingTransactions;

    const newBlock = new Block({
      timestamp: timestamp,
      lastHash: lastHash,
      index: index,
      data: data,
    });

    this.chain.push(newBlock);

    this.pendingTransactions = [];

    return newBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  initTx(details) {
    return new Transaction(details);
  }

  addNewTx(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLatestBlock().index + 1;
  }

  listAllTx() {
    let allTransactions = [];
    for (let block of this.chain) {
      for (let transaction of block.data) {
        allTransactions.push(transaction);
      }
    }
    return allTransactions;
  }

  updateChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.error('new chain is not longer');
      return;
    }
    if (!Blockchain.isValidChain(newChain)) {
      console.error('Chain is invalid');
      return;
    }

    this.chain = newChain;
  }

  static isValidChain(newChain) {
    if (newChain.length === 0) {
      console.error('New chain is empty');
      return false;
    }

    if (JSON.stringify(newChain[0]) !== JSON.stringify(GENESIS_BLOCK)) {
      console.error('First block in chain is not genesis');
      return false;
    }

    for (let i = 1; i < newChain.length; i++) {
      const { index, lastHash, timestamp, hash, data } = newChain[i];
      const newChainLastHash = newChain[i - 1].hash;

      if (lastHash !== newChainLastHash) {
        console.error(
          `Block index: ${i}, lastHash is not equal to newChainLastHash`
        );
        return false;
      }

      const validatedHash = computeHash(
        index,
        lastHash,
        timestamp.toString(),
        JSON.stringify(data)
      );

      if (hash !== validatedHash) {
        console.error(`Block index: ${i}, hash is not equal to validatedHash`);
        return false;
      }
    }

    return true;
  }
}
