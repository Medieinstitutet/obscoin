const BASE_URL = 'http://localhost:5010/api/v1/obscoin';

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

export { getBlockchain, getBlockById, addTransaction };
