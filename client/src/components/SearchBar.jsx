import React, { useState } from 'react';

const BASE_URL = 'http://localhost:5010/api/v1/obscoin';

const getBlockById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/blockchain/${id}`);
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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blockData, setBlockData] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    console.log('Searching for:', searchTerm);
    const data = await getBlockById(searchTerm);
    setBlockData(data);
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
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
