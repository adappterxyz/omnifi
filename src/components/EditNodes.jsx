import React, { useState } from 'react';
import { SortTable } from './SortTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const { accounts, actions, conditions } = await import('../data.js');

export const EditNodeModal = ({ nodeData, onSave, onClose, nodeType, onDelete }) => {
  const [label, setLabel] = useState(nodeData.label);

  const [actionRows, setActionRows] = useState(
    nodeData.actionRows || actions.map((action, index) => ({
      id: `action-${index}`,
      action: action.action,
      value: action.data,
      label: `${action.action} - ${action.data}`,
    }))
  );

  const [conditionRows, setConditionRows] = useState(
    nodeData.conditionRows || conditions.map((condition, index) => ({
      id: `condition-${index}`,
      action: condition.action,
      value: condition.data,
      label: `${condition.action} - ${condition.data}`,
    }))
  );

  const [selectedAccount, setSelectedAccount] = useState(
    nodeData.selectedAccount || accounts[0].label || ''
  );

  const [trueConnection, setTrueConnection] = useState(nodeData.trueConnection || '');
  const [falseConnection, setFalseConnection] = useState(nodeData.falseConnection || '');

  const handleSave = () => {
    const updatedNodeData = {
      ...nodeData,
      label,
      actionRows: nodeType === 'actionNode' ? actionRows : nodeData.actionRows,
      conditionRows: nodeType === 'conditionNode' ? conditionRows : nodeData.conditionRows,
      selectedAccount: nodeType === 'beneficiaryNode' ? selectedAccount : nodeData.selectedAccount,
      trueConnection: nodeType === 'conditionNode' ? trueConnection : nodeData.trueConnection,
      falseConnection: nodeType === 'conditionNode' ? falseConnection : nodeData.falseConnection,
    };
    onSave(updatedNodeData);
    onClose();
  };

  const handleDeleteNode = () => {
    onDelete(nodeData.id);
    onClose();
  };

  const addActionRow = () => {
    setActionRows([
      ...actionRows,
      { id: `action-${Date.now()}`, action: '', value: '', label: 'New Action - New Value' },
    ]);
  };

  const addConditionRow = () => {
    setConditionRows([
      ...conditionRows,
      { id: `condition-${Date.now()}`, action: '', value: '', label: 'New Condition - New Value' },
    ]);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="input"
          placeholder="Label"
        />

        {nodeType === 'actionNode' && (
          <div>
            <p>Steps:</p>
            <SortTable data={actionRows} setData={setActionRows} />
            <button onClick={addActionRow} className="button button-addrow">
              <AddCircleOutlineIcon />
            </button>
            <p>Value Output:</p>
            <input type="text" className="input" placeholder="Enter value output" />
          </div>
        )}

        {nodeType === 'conditionNode' && (
          <div>
            <p>Conditions:</p>
            <SortTable data={conditionRows} setData={setConditionRows} />
            <button onClick={addConditionRow} className="button button-addrow">
              <AddCircleOutlineIcon />
            </button>
            <div className="connection-settings">
              <p>If true:</p>
              <select
                value={trueConnection}
                onChange={(e) => setTrueConnection(e.target.value)}
                className="select"
              >
                <option value="">Select connecting block</option>
                {/* Populate with appropriate options */}
              </select>
              <p>If false:</p>
              <select
                value={falseConnection}
                onChange={(e) => setFalseConnection(e.target.value)}
                className="select"
              >
                <option value="">Select connecting block</option>
                {/* Populate with appropriate options */}
              </select>
            </div>
          </div>
        )}

        {nodeType === 'beneficiaryNode' && (
          <div>
            <p>Beneficiary Node specific settings:</p>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="select"
            >
              {accounts.map((account) => (
                <option key={account.label} value={account.label}>
                  {account.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="button-container">
          <button onClick={handleSave} className="button">
            Save
          </button>
          {nodeType !== 'startNode' && (
            <button onClick={handleDeleteNode} className="button button-delete">
              <DeleteOutlineIcon /> Delete Node
            </button>
          )}
          <button onClick={onClose} className="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNodeModal;
