import React, { useEffect, useState } from 'react';
import '../App.css';

const Dropdown = ({ nodes, setDynamicPort }) => {
  const [selectedNode, setSelectedNode] = useState('');

  const changeNode = (e) => {
    const nodeNumber = e.target.value;
    setSelectedNode(nodeNumber);
    setDynamicPort(nodeNumber);
  };

  return (
    <div className='dropdown-wrapper'>
      <select
        id='nodeSelect'
        value={selectedNode}
        onChange={changeNode}
        className='dropdown'
      >
        <option value=''>Select a node</option>
        {nodes.map((node, index) => {
          return (
            <option
              key={index}
              value={node.address}
            >
              Node {index + 1}: {node.address}
            </option>
          );
        })}
      </select>

      <p>You are running on Node: {selectedNode}</p>
    </div>
  );
};

export default Dropdown;
