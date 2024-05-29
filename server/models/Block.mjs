import computeHash from '../utils/crypto-lib.mjs';

export default class Block {
  constructor({ timestamp, lastHash = '', index, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.index = index;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return computeHash(
      this.index,
      this.lastHash,
      this.timestamp.toString(),
      JSON.stringify(this.data)
    );
  }
}
