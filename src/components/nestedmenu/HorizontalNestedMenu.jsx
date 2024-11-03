import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { IconContext } from 'react-icons';
import SVG from 'react-inlinesvg';
import * as ChainIcons from "@thirdweb-dev/chain-icons";

import "./HorizontalNestedMenu.css";

const HorizontalNestedMenu = ({ data , icon, getcode, root , setState, setChain}) => {
  const [path, setPath] = useState([]);

  // Update the contracts with icons
  if(icon!==undefined){
  data.forEach(contract => {
    if (icon[contract.chainId]) {
      var obj=contract;
      contract.icon=icon[contract.chainId];
    }
  });
  }else{
    console.log("no icon")
  }

  useEffect(() => {
    if(root ){
    setPath(root); // Update path whenever root changes
  }
    console.log(root);
    
  }, [root]); 

  
  const IComponent = ({ value }) => {
    const IconComponent = ChainIcons[value] || (() => <img src={`/images/${value}.svg`} height="25" />);

    return (
      <IconContext.Provider style={{padding:"5px"}}>{IconComponent && <IconComponent height={25}  />}</IconContext.Provider>
    );
  };

  const getCurrentData = (data, path) => {
    let currentData = data;
    let count=0
    for (let index of path) {
     if(count==0){
      currentData = currentData[index]; count++;
     }else{
      currentData = currentData.children ? currentData.children[index] : null;
    }
    
    }
    return currentData;
  };

  const handleTabClick = (level,index)=> {
    console.log(level,index, path);
    if(level==3){ 
      
      var code=getCurrentData(data,path);
      console.log("dosomething",code);
      getcode(["fn",code.label,code.children[index]]);
  }else if(path.length==level){
    console.log("default");
    const newPath = path.slice(0, level).concat(index);
    setPath(newPath);
    setState(level+1);
    }else{
      console.log("gostan");
      var p = path.slice(0,(level+1));
      //p.push(index); // change this step. index is always 0.
      console.log(p);
      setPath(p);
      setState(level+1);
      
    }

    if(level==0){
      console.log(level);
      if(setChain !== undefined) { setChain(data[index].chainId); }//return chainid
      if(root !== undefined){ setPath(root); }
    }

    if(level==2){
      console.log("con add");
      var code=getCurrentData(data,path);
      getcode(["add",code.label,code.children[index]]);
    }

  
};

  const handleBackToMain = () => {
    if(root){ setPath(root); }else{setPath([])}
    setState(0);
  };

  const renderTabs = (items, level) => {
    if (!items) return null;
  
    // Use the index as the value for consistency.
    let tabValue = path[level] !== undefined ? path[level] : '';
  
    return items.length <= 2 ? (
      <Tabs 
        value={tabValue}
        variant="scrollable"
        scrollButtons="auto"
        aria-label={`Level ${level} tabs`}
      >
        {items.map((item, index) => (
          <Tab key={index}
            icon={level === 0 && item.icon ? <IComponent value={item.icon} /> : null}
            label={item.label} onClick={() => handleTabClick(level, index)} />
        ))}
      </Tabs>
    ) : (
      <FormControl variant="outlined" style={{ minWidth: 120, margin: 10 }}>
        <Select
          value={tabValue !== false && items[tabValue] ? items[tabValue].label : ''}
          onChange={(event) => {
            const selectedIndex = items.findIndex(item => item.label === event.target.value);
            handleTabClick(level, selectedIndex);
          }}
          displayEmpty
          inputProps={{ 'aria-label': `Level ${level} dropdown` }}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {level == 0 && <IComponent value={item.icon} />}  {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  const renderPathTabs = () => {
    let content = [];
    let currentLevelData = { children: data };

    for (let level = 0; level <= path.length; level++) {
      const tabsToRender = level === path.length ? currentLevelData.children : [currentLevelData.children?.[path[level]]];
      if (tabsToRender) {
       
        content.push(renderTabs(tabsToRender, level));
      }
      
      if (level < path.length && currentLevelData.children) {
        currentLevelData = currentLevelData.children[path[level]];
      }
    }

    return <Box display="flex" sx={{'max-width':"100%"}}>{content}</Box>;
  };

  return (

    <Box className="fe" display="flex" flexDirection="column" >
      <Box display="flex" alignItems="center" >
        {path.length > 0 && (
          <IconButton onClick={handleBackToMain}>
            <HomeIcon />
          </IconButton>
        )}
        {renderPathTabs()}
      </Box>
    </Box>
  );
};

export default HorizontalNestedMenu;
