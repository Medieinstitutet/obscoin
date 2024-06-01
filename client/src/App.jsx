import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { getBlockchain, getNodes } from './services/obscoinApi';
import TxForm from './components/TxForm';

function App() {
  const [blockchain, setBlockchain] = useState({});
  const [blockchainList, setBlockchainList] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [dynamicPort, setDynamicPort] = useState('');

  useEffect(() => {
    fetchNodes();
  }, []);

  useEffect(() => {
    if (dynamicPort) {
      fetchBlockchain(dynamicPort);
    }
  }, [dynamicPort]);

  useEffect(() => {
    if (blockchain && blockchain.data && Array.isArray(blockchain.data.chain)) {
      setBlockchainList(blockchain.data.chain);
      setPendingTransactions(blockchain.data.pendingTransactions || []);
    }
  }, [blockchain]);

  const fetchNodes = async () => {
    try {
      const nodes = await getNodes();
      if (nodes.length > 0) {
        const firstNodeAddress = nodes[0].address.toString();

        const port = firstNodeAddress.includes(':')
          ? firstNodeAddress.split(':')[1]
          : firstNodeAddress;

        console.log('Dynamic Port:', port);
        setDynamicPort(port);
      }
    } catch (err) {
      console.error(`Error fetching nodes: ${err}`);
    }
  };

  const fetchBlockchain = async (port) => {
    try {
      const blockchainData = await getBlockchain(port);
      setBlockchain(blockchainData);
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
      <TxForm
        fetchBlockchain={fetchBlockchain}
        dynamicPort={dynamicPort}
      />
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
