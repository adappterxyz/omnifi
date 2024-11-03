import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
 
const LEditor = ({ setCodeSnippet, codeSnippet, language, state ,chain}) => {
  const [lineNumbers, setLineNumbers] = useState('1');
  const lineNumberRef = useRef(null);


  const loadVersions = async () => {
  //  const { releases, latestRelease, builds } = await getCompilerVersions()
   };


  const handleCodeSnippetChange = (event) => {
    setCodeSnippet(event.target.value);
    
  };
  function removeMarkdown(text) {
    // This regular expression matches the whole code block, including
    // the starting and ending backticks. The `s` flag allows . to match newline characters.
    if(text.includes('```')){
    const regex = /```.*?\n([\s\S]*?)\n```/g;
    let result = '';
    let match;

    // Using a while loop to find all matches in the text
    while ((match = regex.exec(text)) !== null) {
        // Concatenating the content of the code blocks
        result += match[1] + '\n'; // Adding a newline for each block's content
    }

    return result.trim(); // Remove leading/trailing newline
  }else{
    return text;
  }

}

  const findNewLines = (textBlock1, textBlock2) => {
    // Split each text block into an array of lines
    const linesBlock1 = textBlock1.split('\n');
    const linesBlock2 = textBlock2.split('\n');
  
    // Find lines that are in the second text block but not in the first, including their positions
    const newLinesWithPositions = linesBlock2
      .map((line, index) => ({ line, position: index })) // Map each line to an object with the line and its index
      .filter(({ line }) => !linesBlock1.includes(line)); // Filter out lines that are not new
  
    return newLinesWithPositions;
  }

  const insertAIfn = (textBlock1, textBlock2) => {
    // Split each text block into an array of lines
    const linesBlock1 = textBlock1.split('\n');
    const linesBlock2 = textBlock2.split('\n');
  
    // Find lines that are in the second text block but not in the first
    const newLines = linesBlock2.filter(line => !linesBlock1.includes(line));
  
    return newLines;
  }


// to add chatgpt to leditor at some point

  const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      
      handleCodeSnippetChange(event);
      const nl = findNewLines(codeSnippet,event.target.value)[0];
      
      if(typeof nl !== "undefined"){
      const patternIndex = nl.line.toLowerCase().indexOf("//ai:");
      // Check if the pattern was found
      if (patternIndex === -1) {
        // Pattern not found, return an appropriate response or an empty string
        return 'Pattern not found';
      } else {
        // Pattern found, isolate and return the part of the string starting with the pattern
        console.log(nl.line.substring(5), language, chain , patternIndex);
        var newcode = event.target.value.split('\n');
        var newarr = [1,2,3];
        fetch(`https://api.adappter.xyz/platform/ai/suggestfn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.login}`
          },
          body: `{
            "context": "${nl.line.substring(5)}",
            "chain": "${chain}",
            "language": "${language}"
          }`
        })
        .then(response => {
          console.log('ai');
          if (!response.ok) {
            throw new Error('Session validation failed');
          }
          return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
          console.log(data);
          var suggestedblock = data.candidates[0].content.parts[0].text; 
          
          console.log(suggestedblock);
          var transarr = {};
         
          newarr = removeMarkdown(suggestedblock).split('\n');//.join("\n");
          console.log(newarr);
         newcode.splice(nl.position+1,0,...newarr);
       event.target.value= newcode.join("\n");
  
        console.log(event.target.value);
        handleCodeSnippetChange(event);
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
       
        
        // event.target.value = event.target.value+"??????????"
      //  insertAIfn(event.target.value,"I");
      }
    }
     
     
    }else if(event.ctrlKey && event.key ===" "){
      console.log('debug current source code');
      fetch(`https://api.adappter.xyz/platform/ai/debug`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.login}`
          },
          body: `{
            "context": "${event.target.value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"')}",
            "chain": "${chain}",
            "language": "${language}"
          }`
        })
        .then(response => {
          console.log('ai');
          if (!response.ok) {
            throw new Error('Session validation failed');
          }
          return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
          console.log(data);
          var debuggedblock = data.candidates[0].content.parts[0].text; 
          
          console.log(debuggedblock);
          debuggedblock = removeMarkdown(debuggedblock);
          console.log(newarr);
        
       event.target.value= event.target.value+'\n //debugged function \n'+debuggedblock;
  
        console.log(event.target.value);
        handleCodeSnippetChange(event);
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  useEffect(() => {
    const numberOfLines = codeSnippet.split('\n').length;
    const newLineNumbers = Array.from({ length: numberOfLines }, (_, i) => i + 1).join('\n');
    setLineNumbers(newLineNumbers);
    var usingVersion ='';
    (async () => { 
      //var ver= await loadVersions() 
    //  console.log(ver);
     })();
    
    
  }, [codeSnippet]);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' , flexGrow: 1}}>
      <pre style={{
          textAlign: "right",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          userSelect: "none",
          "font-size": "12px",
          width: "3px", // Adjust the width as needed
          margin: "0px" // Spacing between line numbers and editor
      }}>
        {lineNumbers}
      </pre>
      <CodeEditor
        className={`${state === 0 ? "null" : ""}`}
        value={codeSnippet}
        language={language}
        placeholder={`Create your function here / ${language}`}
        onBlur={handleCodeSnippetChange}
        onKeyUp={handleKeyUp}
        padding={15}
        style={{ flexGrow: 1,    "font-size": "12px" }}
      />
    </div>
  );
};

export default LEditor;
