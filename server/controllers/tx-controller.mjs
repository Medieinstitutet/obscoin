import Transaction from '../models/Transaction.mjs';

class txController {
  constructor() {
    this.transactions = [];
  }

  createTx(details) {
    if (!details.amount || !details.sender || !details.recipient) {
      throw new Error('Transaction details are incomplete');
    }

    const newTx = new Transaction(details);
    this.transactions.push(newTx);
    return newTx;
  }

  getTx(txId) {
    return this.transactions.find((tx) => tx.txId === txId);
  }

  getTxs() {
    return this.transactions;
  }

  deleteTx(txId) {
    const index = this.transactions.findIndex(
      (transaction) => transaction.txId === txId
    );
    if (index === -1) {
      throw new Error('Transaction not found');
    }

    const deletedTx = this.transactions.splice(index, 1);
    return deletedTx;
  }
}

export default txController;
