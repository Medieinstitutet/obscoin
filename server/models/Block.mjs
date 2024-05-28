import computeHash from '../utils/crypto-lib.mjs';

export default class Block {
  constructor({timestamp, lastHash = '', index, data}) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = this.calculateHash();
    this.index = index;
    this.data = data;
  }

  calculateHash() {
    return computeHash(
      this.index + this.lastHash + this.timestamp + JSON.stringify(this.data)
    );
  }
}
