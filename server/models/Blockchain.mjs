import Transaction from './Transaction.mjs';
import { computeHash } from '../utils/crypto-lib.mjs';
import {Block} from '../models/Block.mjs'

const GENESIS_BLOCK = {
  timestamp: 1,
  lastHash: '0',
  hash: '0',
  index: 0,
  data: [],
};
export default class Blockchain {
  constructor() {
    this.chain = [GENESIS_BLOCK];

    this.pendingTransactions = [];
  } 

  addBlock(data) {
    const latestBlock = this.getLatestBlock()
    const newBlock = new Block({
      timestamp: Date.now(),
      lastHash: latestBlock.hash,
      hash: hash,
      index: latestBlock.index + 1,
      data: data
  })
    this.chain.push(newBlock)
    return newBlock
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  initTx(details) {
    return new Transaction(details);
  }

  addNewTx(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLatestBlock().index + 1;
  }

  updateChain(newChain) {
    if (newChain.length <= this.chain.length) {
      throw new Error('New chain is not longer than current chain');
    }

    if (!Blockchain.isValidChain(newChain)) {
      throw new Error('New chain is invalid');
    }

    this.chain = newChain;
  }

  static isValidChain(newChain) {
    if (newChain.length === 0) {
      throw new Error('New chain is empty');
    }

    if (JSON.stringify(newChain[0]) !== JSON.stringify(GENESIS_BLOCK)) {
      throw new Error('First block in chain is not genesis');
    }

    for (let i = 1; i < newChain.length; i++) {
      const { timestamp, lastHash, hash, data } = newChain[i];
      const newChainLastHash = newChain[i - 1].hash;

      if (lastHash !== newChainLastHash) {
        throw new Error(`Block index: ${i} has an invalid lastHash`);
      }

      const validatedHash = computeHash(timestamp, lastHash, data);

      if (hash !== validatedHash) {
        throw new Error(`Block index: ${i} has an invalid hash`);
      }
    }
    return true;
  }
}
