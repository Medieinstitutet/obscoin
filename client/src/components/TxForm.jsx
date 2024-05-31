import React, { useState } from 'react';
import { addTransaction } from '../services/obscoinApi';

const TxForm = ({ fetchBlockchain }) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const transaction = {
      sender,
      recipient,
      amount: +amount,
    };
    try {
      await addTransaction(transaction);
      fetchBlockchain(); // Re-fetch the blockchain to update the UI
    } catch (err) {
      console.error(`Error adding transaction: ${err}`);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <h3>Add a transaction</h3>
        <form
          className="tx-form"
          onSubmit={handleAddTransaction}
        >
          <label>
            Sender:
            <input
              type="text"
              value={sender}
              placeholder="Type name here..."
              onChange={(e) => setSender(e.target.value)}
              required
            />
          </label>
          <label>
            Recipient:
            <input
              type="text"
              value={recipient}
              placeholder="Type name here..."
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              value={amount}
              placeholder="Type amount here..."
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </>
  );
};

export default TxForm;
