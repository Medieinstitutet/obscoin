const BASE_URL = 'http://localhost:5010/api/v1/obscoin';
const DYNAMIC_PORT = 'get dynamic port from getNodes';
const DYNAMIC_URL = `http://localhost:${DYNAMIC_PORT}/api/v1/obscoin`;

const handleFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(`Error: ${err} while fetching.`);
  }
};
const getNodes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/nodes`);
    const data = await response.json();
    console.log(data.nodes);

    return data.nodes;
  } catch (err) {
    console.log(`Error: ${err} while fetching.`);
  }
};
// const getNodes = () => handleFetch(`${BASE_URL}/nodes`);
const getBlockchain = () => handleFetch(`${BASE_URL}/blockchain`);
const getBlockById = (id) => handleFetch(`${BASE_URL}/blockchain/${id}`);

const addTransaction = async (txData) => {
  try {
    const response = await fetch(`${BASE_URL}/transactions/transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(txData),
    });

    const result = await response.json();
    console.log('Transaction added: ', result);
    return result;
  } catch {
    console.log(`Error: ${err} while adding block.`);
  }
};

export { getNodes, getBlockchain, getBlockById, addTransaction };
