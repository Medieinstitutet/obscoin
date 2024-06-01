import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { getBlockchain } from './services/obscoinApi';
import TxForm from './components/TxForm';

function App() {
  const [blockchain, setBlockchain] = useState({});
  const [blockchainList, setBlockchainList] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    fetchBlockchain();
  }, []);

  useEffect(() => {
    console.log('Blockchain changed', blockchain);
    if (blockchain && blockchain.data && Array.isArray(blockchain.data.chain)) {
      setBlockchainList(blockchain.data.chain);
      setPendingTransactions(blockchain.data.pendingTransactions || []);
    }
    console.log(pendingTransactions);
  }, [blockchain]);

  const fetchBlockchain = async () => {
    try {
      const blockchainData = await getBlockchain();
      setBlockchain(blockchainData);
      if (blockchainData && blockchainData.data) {
        setBlockchainList(blockchainData.data.chain);
        setPendingTransactions(blockchainData.data.pendingTransactions || []);
      }
    } catch (err) {
      console.error(`Error fetching blockchain: ${err}`);
    }
  };

  const renderBlockchain = () => {
    return blockchainList.map((block, index) => (
      <div
        key={index}
        className="block"
      >
        <h3>Block {index + 1}</h3>
        <p>Hash: {block.hash}</p>
        <p>Last Hash: {block.lastHash}</p>
        <p>Timestamp: {block.timestamp}</p>
        <ul className="transaction-list">
          <h3>Transactions</h3>
          {block.data.map((transaction, i) => (
            <li key={i}>
              <p>Amount: {transaction.amount}</p>
              <p>Recipient: {transaction.recipient}</p>
              <p>Sender: {transaction.sender}</p>
              <p>Transaction Id: {transaction.txId}</p>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderPendingTransactions = () => {
    return pendingTransactions.map((transaction, i) => (
      <li key={i}>
        <p>Amount: {transaction.amount}</p>
        <p>Recipient: {transaction.recipient}</p>
        <p>Sender: {transaction.sender}</p>
        <p>Transaction Id: {transaction.txId}</p>
      </li>
    ));
  };

  return (
    <>
      <Header />
      <TxForm fetchBlockchain={fetchBlockchain} />
      {pendingTransactions.length > 0 ? (
        <>
          <h3>Pending Transactions</h3>
          <ul className="pending-transactions">
            {renderPendingTransactions()}
          </ul>
        </>
      ) : (
        'No pending transactions...'
      )}
      {blockchainList.length > 0 ? (
        <ul>{renderBlockchain()}</ul>
      ) : (
        <p>Loading blockchain...</p>
      )}
    </>
  );
}

export default App;
