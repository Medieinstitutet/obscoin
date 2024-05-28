import Transaction from '../models/Transaction.mjs';

let transactions = [];

export const createTx = (req, res, next) => {
  const { amount, sender, recipient } = req.body;

  if (!amount || !sender || !recipient) {
    return res
      .status(400)
      .json({ error: 'Transaction details are incomplete' });
  }

  try {
    const newTx = new Transaction({ amount, sender, recipient });
    transactions.push(newTx);
    res.status(201).json(newTx);
  } catch (error) {
    next(error);
  }
};

export const getTxById = (req, res, next) => {
  const { txId } = req.params;

  const transaction = transactions.find(
    (transaction) => transaction.txId === txId
  );

  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.status(200).json(transaction);
};

export const getAllTx = (req, res, next) => {
  res.status(200).json(transactions);
};

export const deleteTxById = (req, res, next) => {
  const { txId } = req.params;

  const index = transactions.findIndex(
    (transaction) => transaction.txId === txId
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  const deletedTx = transactions.splice(index, 1);
  res.status(200).json(deletedTx);
};
