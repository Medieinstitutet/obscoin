import { v4 as uuid4 } from 'uuid';

export default class Transaction {
  constructor(details) {
    this.amount = details.amount;
    this.sender = details.sender;
    this.recipient = details.recipient;
    this.txId = this.generateTxId();
  }

  generateTxId() {
    return uuid4().replaceAll('-', '');
  }
}
