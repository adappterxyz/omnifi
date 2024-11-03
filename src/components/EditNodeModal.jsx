import React, { useState } from 'react';

const EditNodeModal = ({ nodeData, onSave, onClose }) => {
  const [label, setLabel] = useState(nodeData.label);

  const handleSave = () => {
    onSave({ ...nodeData, label });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Node</h2>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditNodeModal;
