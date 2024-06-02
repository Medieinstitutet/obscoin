import Transaction from '../models/Transaction.mjs';
import { blockchain } from '../server.mjs';

export const createTx = (req, res, next) => {
  const { amount, sender, recipient } = req.body;

  if (!amount || !sender || !recipient) {
    return res.status(400).json({ error: 'Transaction details are incomplete' });
  }

  try {
    const newTx = new Transaction({ amount, sender, recipient });
    blockchain.addNewTx(newTx);
    res.status(201).json(newTx);
  } catch (error) {
    next(error);
  }
};

export const getTxById = (req, res, next) => {
  const { txId } = req.params;

  let transaction = null;

  for (let block of blockchain.chain) {
    transaction = block.data.find((tx) => tx.txId === txId);
    if (transaction) break;
  }

  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.status(200).json(transaction);
};

export const getAllTx = (req, res, next) => {
  res.status(200).json(blockchain.pendingTransactions);
};
