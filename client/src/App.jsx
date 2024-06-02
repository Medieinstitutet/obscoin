import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { getBlockchain, getNodes } from './services/obscoinApi';
import TxForm from './components/TxForm';
import {
  renderBlockchain,
  renderPendingTransactions,
} from './components/TxList';

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
        const firstNodeAddress = nodes[0].address;

        console.log('Dynamic Port:', firstNodeAddress);
        setDynamicPort(firstNodeAddress);
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

  return (
    <>
      <Header />
      <div className="wrapper">
        <TxForm
          fetchBlockchain={fetchBlockchain}
          dynamicPort={dynamicPort}
        />
        <div>
          {pendingTransactions.length > 0 ? (
            <>
              <h3>Pending Transactions</h3>
              <ul className="pending-transactions">
                {renderPendingTransactions(pendingTransactions)}
              </ul>
            </>
          ) : (
            'No pending transactions...'
          )}
          {blockchainList.length > 0 ? (
            <ul>{renderBlockchain(blockchainList)}</ul>
          ) : (
            <p>No blockchain</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
