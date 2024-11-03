import React, { useState, useEffect , useRef} from 'react';
import { Button, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IconContext } from 'react-icons';
import SVG from 'react-inlinesvg';
import * as ChainIcons from "@thirdweb-dev/chain-icons";
import networks from "../../init/networks.json";
import contracts2 from '../../init/contracts.json';
import CodeEditor from '@uiw/react-textarea-code-editor';
import LEditor from '../../components/leditor/LEditor';
import HorizontalNestedMenu from '../../components/nestedmenu/HorizontalNestedMenu';

import './FunctionEditor.css';


const FunctionEditor = ({ functionOptions, setFunctionOptions }) => {
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedChain, setSelectedChain] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [selectGroup, setSelectGroup] = useState([]);
  const [functionBlocks, setFunctionBlocks] = useState({});
  const [customFunctions, setCustomFunctions] = useState([]);
  const [customFunctionName, setCustomFunctionName] = useState('');
  const [language, setLanguage] = useState("js");
  const [editorState, setEditorState] = useState(0);
  const [root, setRoot] = useState([]);
  const iconMap = networks.reduce((acc, chain) => {
    acc[chain.id] = chain.icon;
    return acc;
  }, {});
  const [displayState, setDisplayState] = useState();



const getcode= (ret)=> {
  if(ret[0]=="fn"){ setCodeSnippet(codeSnippet+ret[1]+ret[2].label); }
}

  const IComponent = ({ value }) => {
    const IconComponent = ChainIcons[value] || (() => <img src={`/images/${value}.svg`} height="25" />);

    return (
      <IconContext.Provider>{IconComponent && <IconComponent height={25} />}</IconContext.Provider>
    );
  };


  const handleFunctionSelection = (selectedOption) => {
    setSelectedFunction(selectedOption?.value);
    setSelectedChain("");
console.log(selectedOption?.value);
    if (selectedOption.value === 'custom') {
      setCodeSnippet('');
      setCustomFunctionName('');
      selectedOption.label = '';
    //  setSelectedFunction(selectedOption);
    } else {
      const selectedBlock = functionBlocks[selectedOption]?.[selectedChain?.value];
      if (selectedBlock) {
        setCodeSnippet(selectedBlock);
      } else {
        setCodeSnippet('');
      }
    }
  };
  const handleChainSelectionList = (selectedOption) => {
    if(selectedFunction!=""){
    setSelectedChain(selectedOption.id);
    setEditorState(1);

    setRoot([contracts1.findIndex(element => element.chainId === selectedOption.id)]); 
  }else{ 
    return ;
   }
    if (selectedFunction?.value !== 'custom') {
      const selectedBlock = functionBlocks[selectedFunction]?.[selectedOption.id];

         setLanguage(selectedOption.language);
         console.log(selectedChain,selectedBlock);
      if (selectedBlock) {

        setCodeSnippet(selectedBlock);
      } else {
        setCodeSnippet('');
      }
    }
  
  };

  const handleCodeSnippetChange = (event) => {
    setCodeSnippet(event.target.value);
  };
  const handleKeyUp = (event,fn) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed', fn);
      //call
       
      fn(event,);
      // Add your logic here that should run when Enter is pressed
    }
  };
  const handleUpdateFunctionBlock = () => {
    console.log(selectedFunction,selectedChain,codeSnippet);
fetch(`https://api.adappter.xyz/platform/fn/create`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.login}`
  },
  body: JSON.stringify({fnName: selectedFunction, chain: selectedChain, code:codeSnippet })
})
.then(response => {
console.log(response);
if (!response.ok) {
  throw new Error('Network response was not ok');
}
})
.then(data => {
  // If success, load profile data
  console.log("updated: ",selectedFunction,selectedChain,codeSnippet);
 // xxx
})
.catch(error => {
  console.error('Error:', error)
});
 
      setFunctionBlocks((prevFunctionBlocks) => {
        const newFunctionBlocks = { ...prevFunctionBlocks };
        
        if (selectedFunction === 'custom') {
          console.log(functionOptions);
          const newCustomFunction = {
            value: customFunctionName,
            label: customFunctionName,
          };
          newFunctionBlocks[customFunctionName]={};
          newFunctionBlocks[customFunctionName] = {
            ...(newFunctionBlocks[customFunctionName] || {}),
            [selectedChain.id]: codeSnippet,
          };
  
        //  setCustomFunctions((prevCustomFunctions) => [...prevCustomFunctions, newCustomFunction]);
          setFunctionOptions([...functionOptions, newCustomFunction]);
          setSelectedFunction(customFunctionName);
          console.log(functionOptions);
        } else {
          console.log(newFunctionBlocks)
          newFunctionBlocks[selectedFunction] = {
            ...(newFunctionBlocks[selectedFunction] || {}),
            [selectedChain]: codeSnippet,
          };
          console.log(newFunctionBlocks)
          localStorage.codeBlock = JSON.stringify(newFunctionBlocks);    
        }
  
        return newFunctionBlocks;
      });
      //setSelectedFunction('');
      setSelectedChain('');
      setCodeSnippet('');
      console.log(JSON.parse(localStorage.codeBlock));
//update API here

  };
  

  const networkOptions = networks;
  var contracts1 = contracts2;

  useEffect(() => {
    const numberOfLines = codeSnippet.split('\n').length;
    const newLineNumbers = Array.from({ length: numberOfLines }, (_, i) => i + 1).join('\n');
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.adappter.xyz/platform/fn/retrieve`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.login}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log("updated: ", data);
        setFunctionBlocks(data); // Assuming you want to store this in your state
        localStorage.codeBlock = JSON.stringify(data);    
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    if(functionBlocks =={}){ 
      
     }else{ 
      console.log(functionBlocks); }
    
    setSelectGroup([...functionOptions, { value: 'custom', label: 'Custom' }]);
    
  }, [codeSnippet, functionOptions, customFunctions]);



  
  
  const networkSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '5px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#003a80' : 'transparent',
      color: state.isSelected ? '#fff' : '#333',
      cursor: 'pointer',
    }),

    input: () => ({
      display: 'none',
    }),
  };

  return (
    <div className="configcom function-editor">
      <div className='function-name'>
      <div className="input-container">
      <FormControl fullWidth>
        <InputLabel id="function-select-label" sx={{ color: 'white' }}>Function</InputLabel>
        <Select
          labelId="function-select-label"
          id="function-select"
          value={selectedFunction}
          label="Function"
          onChange={(evn) => handleFunctionSelection(evn.target)}
          sx={{ color: '#666', '& .MuiSvgIcon-root': { color: '#666' } }} // Also sets color of dropdown icon
        >
          {selectGroup.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ color: '#666' }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
      {selectedFunction === 'custom' && (
        <div className="input-container">
          <TextField
          label="Custom Function Name"
          variant="outlined"
          value={customFunctionName}
          onChange={(e) => setCustomFunctionName(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          // Add additional styling if needed
        />
        </div>
  
      )}
            <div className={`input-container`}>
          
{selectedFunction === "custom" ?           
  (<Button
    variant="contained"
    color="primary"
    onClick={handleUpdateFunctionBlock}
    style={{ top: '15px' }} // Inline styling example
    // Add additional styling if needed
  >
    Create
  </Button>):null
}
{selectedChain !== "" ?           
  (<Button
    variant="contained"
    color="primary"
    onClick={handleUpdateFunctionBlock}
    style={{ top: '15px' }} // Inline styling example
    // Add additional styling if needed
  >
    Save
  </Button>):null
}
        </div>
 </div>
      <hr/>
      {(selectedFunction !=="" && selectedFunction !=="custom") ?(
      <Card className={`editor-container ${selectedFunction == "" ? 'null' : ''}`}
        >
         
           <ul className={`chain-selection-list`}>
          {networkOptions.map(option => (
            <li 
              key={option.value}
              onClick={() => handleChainSelectionList(option)}
              className={`chain-item ${selectedChain == option.id ? 'selected' : ''}`}
            >
              <IComponent value={option.icon} />
              <span>{option.label}</span> 
            </li>
          ))}
        </ul>
        <div className="editor">
        {selectedChain !== "" ? (<LEditor  codeSnippet={codeSnippet} setCodeSnippet={setCodeSnippet} state={editorState} language={language} chain={selectedChain} ></LEditor>):(<div class="chainnotice">Select a chain to update function</div>)}
        </div>
    </Card>):null }
   

    <div  className={`library ${selectedChain==""? "null":""}`}>
    <HorizontalNestedMenu  icon={iconMap}  data={contracts1} root={root} getcode={getcode} setState={setDisplayState}/>
    </div>
    </div>
  );
};
 
export default FunctionEditor;
