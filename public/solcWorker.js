// solcWorker.js - A more complete version

// Function to dynamically load the solc version specified in the message
function loadSolc(version) {
  self.importScripts(`https://solc-bin.ethereum.org/bin/soljson-${version}.js`);
  console.log(`Loaded solc version: ${version}`);
}

// Function to compile Solidity source code using loaded solc
function compileSolidity(sourceCode) {
  importScripts(`https://solc-bin.ethereum.org/bin/soljson-latest.js`);
 console.log();
    // Standard JSON input format for the compiler
    const input = {
        language: 'Solidity',
        sources: {
            'MyContract.sol': {
                content: sourceCode, // Your Solidity source
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'], // Request everything
                },
            },
        },
    };

    // Perform the compilation
    try {
     
      const compileMethod = solc.compile ? solc.compile : solc.compileStandard ? solc.compileStandard : solc.compileStandardWrapper;
      console.log(5, compileMethod);
      if (!compileMethod) {
          throw new Error('Compile method not found in solc-js.');
      }
    } catch (error) {
      console.log(7,error);
        self.postMessage({ type: 'error', error: error.toString() });
    }
}

// Respond to messages from the main thread
self.onmessage = (e) => {
  console.log(1);
    if (e.data.type === 'loadCompiler') {
      console.log(2);
        loadSolc(e.data.version);
    } else if (e.data.type === 'compile') {
      const output = Module.compile(input);
      console.log
        // Ensure the compiler is loaded and ready
        if (typeof Module !== 'undefined' && Module.compile) {
          console.log(4);
            compileSolidity(e.data.source);
        } else {
            self.postMessage({ type: 'error', error: 'Compiler not ready.' });
        }
    }
};
