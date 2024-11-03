import React, { useState } from 'react';
import EditNodeModal from './EditNodeModal'; // Import the modal component

const startNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      className="node"
      style={{
        backgroundColor: '#FFCC00',
        color: '#000',
        border: '2px solid #333',
        borderRadius: '5px',
      }}
      onDoubleClick={() => onDoubleClick(id, data)}
    >
      {data.label}
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};

const BasicNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      className="node"
      style={{
        padding: '10px',
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: '5px',
        border: '1px solid #555',
      }}
      onDoubleClick={() => onDoubleClick(id, data)}
    >
      <Handle type="target" position="left" style={{ background: '#555' }} />
      {data.label}
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};

const conditionNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      className="node"
      style={{
        padding: '10px',
        backgroundColor: '#a6dbad',
        color: '#333',
        borderRadius: '50%',
        border: '1px solid #555',
      }}
      onDoubleClick={() => onDoubleClick(id, data)}
    >
      <Handle type="target" position="left" style={{ background: '#555' }} />
      {data.label}
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};
