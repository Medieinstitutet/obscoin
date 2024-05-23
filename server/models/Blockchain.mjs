const GENESIS_BLOCK = {
  timestamp: Date.now(),
  lastHash: '0',
  hash: '0',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
};
export default class Blockchain {
  constructor() {
    this.chain = [GENESIS_BLOCK];
  }
}
