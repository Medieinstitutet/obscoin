const GENESIS_BLOCK = {
  timestamp: Date.now(),
  lastHash: '0',
  hash: '0',
  index: 0,
  data: [],
};
export default class Blockchain {
  constructor() {
    this.chain = [GENESIS_BLOCK];
  }

  updateChain(newChain) {
    if (newChain.length <= this.chain.length) {
      throw new Error('New chain is not longer than current chain');
    }

    if (!this.isValidChain(newChain)) {
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
