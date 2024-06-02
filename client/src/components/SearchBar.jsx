import React, { useState } from 'react';
import '../SearchBar.css';

const getTxById = async (txId, dynamicPort) => {
  try {
    const response = await fetch(
      `http://localhost:${dynamicPort}/api/v1/obscoin/transactions/${txId}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const SearchBar = ({ dynamicPort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blockData, setBlockData] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (searchTerm) => {
    const data = await getTxById(searchTerm, dynamicPort);
    setBlockData(data);
  };

  return (
    <div >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
        className='search-wrapper'
      >
        <input
          type='text'
          placeholder='Insert transaction id..'
          value={searchTerm}
          onChange={handleInputChange}
          className='search-input'
        />

        <button type='submit'>Search</button>
      </form>
      {blockData && (
        <div>
          <h2>Block Data</h2>
          <pre>{JSON.stringify(blockData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
