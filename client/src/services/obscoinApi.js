const BASE_URL = 'http://localhost:5010/api/v1/obscoin';

const handleFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error: ${err} while fetching.`);
    return {};
  }
};

const getNodes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/nodes`);
    const data = await response.json();
    return data.nodes;
  } catch (err) {
    console.error(`Error fetching nodes: ${err}`);
    return [];
  }
};

const getBlockchain = async (dynamicPort) => {
  const DYNAMIC_URL = `http://localhost:${dynamicPort}/api/v1/obscoin/blockchain`;
  return handleFetch(DYNAMIC_URL);
};

const addTransaction = async (txData, dynamicPort) => {
  const DYNAMIC_URL = `http://localhost:${dynamicPort}/api/v1/obscoin/transactions/transaction`;
  try {
    const response = await fetch(DYNAMIC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(txData),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(`Error: ${err} while adding transaction.`);
    return {};
  }
};

const addBlockchain = async (dynamicPort) => {
  const DYNAMIC_URL = `http://localhost:${dynamicPort}/api/v1/obscoin/blockchain/mine`;
  try {
    const response = await fetch(DYNAMIC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(`Error: ${err} while mining.`);
  }
};

export { getNodes, getBlockchain, addTransaction, addBlockchain };
