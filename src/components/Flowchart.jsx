import React, { useState, useEffect } from 'react';
import {
  ReactFlow,
  useReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './styles.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeploymentIcon from '@mui/icons-material/Publish';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import CircularProgress from '@mui/material/CircularProgress';
import BoltIcon from '@mui/icons-material/Bolt';
import {EditNodeModal, ActionNodeModal, ConditionNodeModal, ExecutionNode} from './EditNodes';
import pdfToText from 'react-pdftotext'
let id = 5; // Initial ID for new nodes

const getId = () => `node-${id++}`;

const initialNodes = [
  {
    id: '1',
    type: 'startNode',
    data: { label: 'Start' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [];



const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  zIndex: 1000,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  marginRight: '10px',
};

const nodeStyle = {
  padding: '10px',
  border: '1px solid #333',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  display:'flex',
  fontWeight: 'bold',
};

const StartNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      style={{ ...nodeStyle, backgroundColor: '#FFCC00', color: '#000',
        borderRadius: '8px',  display:'flex' }}
      onDoubleClick={() => onDoubleClick(id, data, 'startNode')}
    >
      <DoubleArrowIcon style={{ marginRight: '8px' }} />
      {data.label}
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};

const ActionNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      style={{ ...nodeStyle, backgroundColor: '#fff', color: '#333' , display:'flex' }}
      onDoubleClick={() => onDoubleClick(id, data, 'actionNode')}
    >
      <BoltIcon style={{ marginRight: '8px' }} />
      {data.label}
      <Handle type="target" position="left" style={{ background: '#555' }} />
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};

const BeneficiaryNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      style={{ ...nodeStyle, backgroundColor: '#a6dbad', color: '#333', width: '90px', height:'90px', borderRadius: '50%' }}
      onDoubleClick={() => onDoubleClick(id, data, 'beneficiaryNode')}
    ><div>
      <AccountCircleIcon style={{ marginRight: '8px' }} />
        <br/><sup>{data.label}</sup>
        </div>
      <Handle type="target" position="left" style={{ background: '#555' }} />
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};

const ConditionNode = ({ data, id, onDoubleClick }) => {
  return (
    <div
      style={{ ...nodeStyle, backgroundColor: '#77c0cf', color: '#333', width: '120px', height:'120px', borderRadius: '50%' }}
      onDoubleClick={() => onDoubleClick(id, data, 'conditionNode')}
    >
      <div>
      <QuestionMarkIcon style={{ marginRight: '8px' }} />
      <br/><sup>{data.label}</sup></div>
      <Handle type="target" position="left" style={{ background: '#555' }} />
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  );
};

const ParametersModal = ({ parameters, onSave, onClose }) => {
  const [localParams, setLocalParams] = useState([...parameters]);

  const addParam = () => {
    setLocalParams([...localParams, { key: '', value: '' }]);
  };

  const removeParam = (index) => {
    const newParams = localParams.filter((_, i) => i !== index);
   
    setLocalParams(newParams);
  };

  const updateParam = (index, field, value) => {
    const newParams = localParams.map((param, i) => 
      i === index ? { ...param, [field]: value } : param
    );
    console.log(newParams);
    setLocalParams(newParams);
  };

  const handleSave = () => {
    onSave(localParams);
    onClose();
  };
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px',
    maxHeight: '80vh', // Maximum height of the modal
    overflow: 'auto'   // Enable scrolling if content exceeds maxHeight
  };
  
  const modalContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };
  
  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3 style={{color:'#333'}}>Set Parameters</h3>
        {localParams.map((param, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={param.key}
              onChange={(e) => updateParam(index, 'key', e.target.value)}
              placeholder="Key"
              style={inputStyle}
            />
            <input
              type="text"
              value={param.value}
              onChange={(e) => updateParam(index, 'value', e.target.value)}
              placeholder="Value"
              style={inputStyle}
            />
            <button onClick={() => removeParam(index)}  className="button button-deploy">Remove</button>
          </div>
        ))}
        <div style={{display:'flex'}}>
        <button onClick={addParam} className="button button-set" >Add Parameter</button>
        <button onClick={handleSave} className="button button-set" >Save</button>
        <button onClick={onClose} className="button button-set"  >Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Flowchart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [projectname, setProjectname] = useState("");
  const [isCreating, setIsCreating] = useState(false); 
  const [loading, setLoading] = useState(false); // State for loading UI

  const [isParamModalOpen, setIsParamModalOpen] = useState(false);
  const [parameters, setParameters] = useState([
{key:'Calendar',value:'US'},{key:"Annualized IR",value:'6%'},
{key:"Fixing Cycle",value:'Daily'}

  ]);
  const [init, setInit] = useState(false);
  const { toObject } = useReactFlow();


  
  const handleEdgeDoubleClick = (event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };
  

  const handleCreateProject = () => {
    setIsCreating(true);
  };
  
  useEffect(() => {
    if (init && projectname) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === '1'
            ? { ...node, data: { ...node.data, label: projectname } }
            : node
        )
      );
    }
  }, [init, projectname]);

  const onConnect = (params) =>
    setEdges((eds) =>
      
      addEdge(
        {
          ...params,
          animated: true,
          label:'',
          type:'smoothstep',
          style: { stroke: 'white', strokeWidth: 2 },
        },
        eds
      )
    );

    const onDoubleClickNode = (id, data, type) => {
      setSelectedNode({ id, data, type });
      setIsEditing(true);
    };

  const handleSave = (newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newData.label } }
          : node
      )
    );
    setIsEditing(false);
  };


  const handleDelete = () => {
    const nodeId = selectedNode.id; // Get the ID of the selected node
    console.log("Deleting node with ID:", nodeId);
    setNodes((nds) => nds.filter((node) => node.id !== nodeId)); // Remove the node from the nodes state
    setIsEditing(false); // Close the modal
  };
  
  const handleParamSave = (newParams) => {
    setParameters(newParams);
  };

  const addNode = () => {
    const rightmostPos = findRightmostNode();
    const newNode = {
      id: getId(),
      type: 'actionNode',
      data: { label: `Action ${id}` },
      position: { 
        x: rightmostPos.x + 200,
        y: rightmostPos.y 
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addCNode = () => {
    const rightmostPos = findRightmostNode();
    const newNode = {
      id: "c" + getId(),
      type: 'conditionNode',
      data: { label: `Conditions ${id}` },
      position: { 
        x: rightmostPos.x + 200,
        y: rightmostPos.y 
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addBNode = () => {
    const rightmostPos = findRightmostNode();
    const newNode = {
      id: "b" + getId(),
      type: 'beneficiaryNode',
      data: { label: `Beneficiary ${id}` },
      position: { 
        x: rightmostPos.x + 200,
        y: rightmostPos.y 
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };


  const fetchChatInit = async () => {


    const response = await fetch('https://chatapi.akash.network/api/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-pVFO1gcQWptU8NT4dQYPXQ'
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3-1-8B-Instruct-FP8',
        prompt: `
        `
      })
    });
  
    const data = await response.json();
    return data;
    console.log(JSON.stringify(data, null, 2));
  };

  const fetchChatCompletion = async (msg) => {
    const response = await fetch('https://chatapi.akash.network/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-pVFO1gcQWptU8NT4dQYPXQ'
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3-1-8B-Instruct-FP8',
        messages: msg
      })
    });
  
    const data = await response.json();
    return data;
    console.log(JSON.stringify(data, null, 2));
  };
  
  function extractMarkdownContent(markdownString) {
    // Define a regular expression to match the content between ```json and ```
    const regex = /```json\n([\s\S]*?)\n```/g;
  
    // Use the regular expression to find matches in the string
    const matches = markdownString.match(regex);
  
    if (!matches) {
      return null; // Return null if no matches are found
    }
  
    // Extract the JSON content from the match
    const jsonString = matches[0].replace(/```json\n|\n```/g, '');
  
    try {
      // Parse the JSON content
      const jsonData = JSON.parse(jsonString);
      return jsonData; // Return the parsed JSON object
    } catch (error) {
      console.error("Invalid JSON format:", error);
      return null;
    }
  }
  
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setLoading(true); // Show loading spinner
      console.log('PDF file uploaded:', file);

      const context = await pdfToText(file)
      .then(text => {console.log(text); return text; })
      .catch(error => console.error("Failed to extract text from pdf"))

      setInit(true);
      setProjectname('uploaded');
      
      // Simulate a delay for file processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const { dummyflow , eg } = await import('../data.js');
  
      const msg ={
        role: 'user',
        content: `You are a termsheet interpreter that will process the product lifecycle the document information and present the data and understanding
        as a flowchart. You will create a flow diagram with action, conditions and beneficiary nodes in json format with children element nodes and edges.
        Generate the flow chart json data using the following data: ${JSON.stringify(context)} , 
        but follow the format given by ${JSON.stringify(eg)} closely.   Only return JSON in a markdown and in JSON format in the response.  `
      };
      const result = await fetchChatCompletion([msg]);
      const msg2 = {role:'user', content : `Extract all relevant parameters such as interest rates (or coupon rates), 
        coupon payment dates (#1,2,3 ...), calendar type, cycle periods, ... or other considerations that would affect 
        calculations from the context. Return result in markdown json of key value pairs in 
        [{ key: '', value: '' },...]
        Generate relevant parameters such as interest rates, individual coupon payment dates for each year 
        (break them down to each date "coupon #1 - dd-mm-yyyy" format for each key-value entry), 
        calendar type and all that could affect calculation or 
        conditons for events in an json formatted array of key-value obj pairs. the response has to be in valid json format. all values are string, not object. if it contains multiple values, create multiple key-value entries instead where each key is renamed in the count of repetition. eg. coupon payment date #1 , coupon payment date #2.
        the response HAS to be properly formatted JSON and markdown as JSON.
        `};
      const result2 = await fetchChatCompletion([msg, {role: 'assistant',content: result.choices[0].message.content}, msg2]);   
      const flow = extractMarkdownContent(result.choices[0].message.content);
      
      const parameters = extractMarkdownContent(result2.choices[0].message.content);
      setParameters(parameters);
      const parsedNodes = flow.nodes;
      const parsedEdges = flow.edges;
      setNodes((nds) => [...nds, ...parsedNodes]);
      setEdges((nds) => [...nds, ...parsedEdges]);

      setLoading(false); // Hide loading spinner

    } else {
      alert('Please upload a valid PDF file.');
    }
  };



  const saveProject = () => {
    console.log('Saving project...');
    // Implement the logic to save the project
    
  };

  const deployProduct = () => {
    const flowJSON = toObject();
    console.log(JSON.stringify(flowJSON, null, 2));
    // Implement the logic to deploy the project
  };

  const handleDatasetChange = async (event) => {
    const selectedDataset = event.target.value;
    
const { dataset } = await import('../data.js');
    // Change nodes and edges based on the selected dataset
    // Example: Load different nodes and edges
    console.log(dataset);
      setNodes(dataset[selectedDataset].nodes);
      setEdges(dataset[selectedDataset].edges);
  };

  const renderInit = () => {
    if (!isCreating) {
      return (
        <div>
        <button onClick={() => setIsCreating(true)} className="button button-add" style={{ fontSize: '20px', padding: '15px 30px', marginBottom: '20px' }}>
          Create a New Project
        </button>
         <button className="button button-add" style={{ fontSize: '20px', padding: '15px 30px', marginBottom: '20px' }}>
         Upload PDF
         <input
           type="file"
           accept="application/pdf"
           onChange={handleFileUpload}
           className="file-input"
           style={{width:"200px"}}
         />
       </button>
       </div>
      );
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          value={projectname}
          onChange={(e) => setProjectname(e.target.value)}
          placeholder="Enter Project Name"
          className="input"
          style={{ fontSize: '18px', padding: '10px', marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />   <button onClick={() => setInit(true)} className="button button-add" style={{ fontSize: '20px', padding: '15px 30px', marginBottom: '20px' }}>
        Create
      </button>
       
      </div>
    );
  };

  const findRightmostNode = () => {
    if (!nodes.length) return { x: 0, y: 250 }; // Default position if no nodes
    
    return nodes.reduce((rightmost, current) => {
      return current.position.x > rightmost.x 
        ? { x: current.position.x, y: current.position.y }
        : rightmost;
    }, { x: nodes[0].position.x, y: nodes[0].position.y });
  };

  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}>
      {loading ? ( 
        // Loading Spinner UI
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress style={{ color: '#fff' }} />
        </div>
      ) : (
        <>
          {init ? (
            <div style={{ height: '90%', backgroundColor: 'black' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left-aligned buttons */}
                <div style={{ display: 'flex', gap: '0px' }}>
                  <button onClick={addNode} className="button button-add">
                    <AddCircleOutlineIcon style={{ marginRight: '8px' }} /> Add Action
                  </button>
                  <button onClick={addCNode} className="button button-add">
                    <SettingsIcon style={{ marginRight: '8px' }} /> Add Condition
                  </button>
                  <button onClick={addBNode} className="button button-add">
                    <AccountCircleIcon style={{ marginRight: '8px' }} /> Add Beneficiary
                  </button>
                  <select onChange={handleDatasetChange}>
                    <option >Format</option>
                    <option value="0">Dataset 1</option>
                    <option value="1">Dataset 2</option>
                  </select>
                </div>

                {/* Right-aligned buttons */}
                <div style={{ display: 'flex', gap: '0px' , marginRight:'20px'}}>
                  <button onClick={() => setIsParamModalOpen(true)} className="button button-set">
                    <SettingsIcon style={{ marginRight: '8px' }} /> Set Parameters
                  </button>
                  <button onClick={saveProject} className="button button-save">
                    <SaveIcon style={{ marginRight: '8px' }} /> Save Project
                  </button>
                  <button onClick={deployProduct} className="button button-deploy">
                    <DeploymentIcon style={{ marginRight: '8px' }} /> Deploy Product
                  </button>
                </div>
              </div>

              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeDoubleClick={handleEdgeDoubleClick}
                snapToGrid={true}
                snapGrid={[15, 15]}
                initialViewport={{ x: 0, y: 0, zoom: 1.5 }}
                style={{ width: '100%', height: '90%' }}
                nodeTypes={{
                  actionNode: (props) => (
                    <ActionNode {...props} onDoubleClick={onDoubleClickNode} />
                  ),
                  conditionNode: (props) => (
                    <ConditionNode {...props} onDoubleClick={onDoubleClickNode} />
                  ),
                  startNode: (props) => (
                    <StartNode {...props} onDoubleClick={onDoubleClickNode} />
                  ),
                  beneficiaryNode: (props) => (
                    <BeneficiaryNode {...props} onDoubleClick={onDoubleClickNode} />
                  )
                }}
              >
                <MiniMap
                  nodeColor={(node) => {
                    switch (node.type) {
                      case 'input':
                        return 'red';
                      case 'output':
                        return 'blue';
                      default:
                        return '#00ff00';
                    }
                  }}
                />
                <Controls color="#000" style={{ backgroundColor: '#333' }} />
                <Background color="#FFF" gap={16} style={{ backgroundColor: '#333' }} />
              </ReactFlow>

              {isEditing && (
                <EditNodeModal
                structure = {toObject()}
                  nodeData={selectedNode.data}
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onClose={() => setIsEditing(false)}
                  nodeType={selectedNode.type}  // Pass the node type here
                  parameters={parameters}
                />
              )}

              {isParamModalOpen && (
                <ParametersModal
                  parameters={parameters}
                  onSave={handleParamSave}
                  onClose={() => setIsParamModalOpen(false)}
                />
              )}
            </div>
          ) : (
            <div style={{ height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              {renderInit()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Flowchart;
