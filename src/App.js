import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import LeftNavBar from "./components/LeftNavBar";
import Loader from "./components/Loader"
import RightPanel from "./components/RightPanel";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {theme, GlobalCss} from './theme-mn';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Flowchart from "./components/Flowchart";
import ReactFlow, { ReactFlowProvider } from '@xyflow/react';

import FunctionEditor from './components/functions/FunctionEditor';
import functions from './init/functions.json';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(1);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [curract, setCurract] = useState('...');
  const [isLoading, setIsLoading] = useState(false);
  const [loadComplete, setLoadComplete] = useState(true);
  const [panelIsVisible, setPanelIsVisible] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  const [functionOptions, setFunctionOptions] = useState(functions);
  //const apiUrl = process.env.REACT_APP_API_URL;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [flowData, setFlowData] = useState(null);

  const apiUrl = 'https://api.adappter.xyz/platform';
  const handleNavItemClick = (item) => {
    setActiveItem(item);

  };
  const initialize = () =>{}
  const handleLogout = (status) => {
    // Begin the logout process
    setIsLoading(true);
    setIsLoggedIn(false);
    setCurract("Logging out...");
    console.log('1logout');
    // Perform the logout using fetch
    fetch(`${apiUrl}/session/logout`, {
      method: 'GET', // Specify the request method
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
        'Authorization': `Bearer ${localStorage.getItem('login')}` // Use localStorage.getItem for safer access
      }
    })
      .then(response => {

        if (!response.ok) {
          // If the response is not ok, you might want to handle this differently
          throw new Error('Network response was not ok');
        }
        // Logout was successful
        if (localStorage.getItem('login')) {
          localStorage.removeItem('login'); // Correctly use localStorage.removeItem
        }
        setIsLoading(false);
        setCurract("...");
      })
      .catch(error => {

        console.log('elogout');
        // Handle any errors during logout
        console.error('Error:', error);
        // Optionally, set loading to false and update status even in case of error
        setIsLoading(false);
        setCurract("...");
      });
  };
  const verifySession = async () => {

    if (localStorage.login) {
      // Check session expiry
      fetch(`${apiUrl}/session/init`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.login}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Session validation failed');
          }
          return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
          console.log(data); setIsLoggedIn(true);
          return true;
          // If success, load profile data




        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }
  const handleLogin = (auth, status) => {
    // Begin loading process
    setIsLoading(true);
    console.log(apiUrl, auth);

    // Perform the login using fetch
    fetch(`${apiUrl}/session/login`, {
      method: 'POST', // Specify the request method
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json' // Specify JSON content type
      },
      body: JSON.stringify(auth) // Convert the `auth` object to a JSON string
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          // If the response is not ok, throw an error
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON in the response
      })
      .then(data => {
        // Handle the successful response here
        if (data.status == 'success') {
          console.log('Response:', data);
          setCurract("Logging in...");
          localStorage.setItem('login', data.info.AuthStr); // Store the login token
          initialize();
        }
        // Set a timeout to simulate loading
        setTimeout(() => {
          setIsLoading(false);
          setCurract("...");
          setIsLoggedIn(true); // Update the login status
        }, 1500);
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
        setCurract("Credential not recognized");
        setTimeout(() => {
          setIsLoading(false);
          setCurract("...");
        }, 1500);
      });
  };

  const retrieve = async (action,body,cstatus) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('login')}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response:', data);
      setCurract(cstatus);
      //handleStatusUpdates(cstatus);
      //
      return data;
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Ensure loading is turned off on error
    }
  };



  useEffect(() => {
   // verifySession();

    return () => {
      if (intervalId) {
        console.log("Cleanup interval: " + intervalId);
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleFlowUpdate = (data) => {
    setFlowData(data);
  };

  return (
    <ReactFlowProvider>
    <ThemeProvider theme={theme}>
       <CssBaseline />   <GlobalCss />
      <GoogleOAuthProvider clientId={googleClientId}>
        <div className="App">
          {isLoading &&
            <div class={`load-bg ${loadComplete ? '' : 'complete'}`}>
             <Loader/>
              <h3><sub>{curract}</sub></h3>
            </div>

          }



          {isLoggedIn ? (<div><LeftNavBar activeItem={activeItem} isNavVisible={isNavVisible} setIsNavVisible={setIsNavVisible} handleNavItemClick={handleNavItemClick} />
            <div className={`${panelIsVisible ? 'reduced' : 'fullview'} ${isNavVisible ? 'shownav' : 'hidenav'}`} >


              {activeItem === 'Dashboard' && <div>
            
              </div>}

              {activeItem === 'Build' && <div>
                <div>    <Flowchart onFlowUpdate={handleFlowUpdate} /></div>
              </div>}
              {activeItem === 'Contracts' && <div>
                <div>
                <FunctionEditor functionOptions={functionOptions} setFunctionOptions={setFunctionOptions} />
        
                </div>
              </div>}

            </div>
            <RightPanel 
              panelIsVisible={panelIsVisible} 
              setPanelIsVisible={setPanelIsVisible} 
              handleLogout={handleLogout}
              flowData={flowData}
            />
          </div>
          ) : ("")
          }
          <Router>
            <Routes>
              <Route path="/explainer" element={<div><h1>Explainer...</h1></div>} />
              {isLoggedIn ? (""
              ) : (
                <Route path="/" element={<Login onLogin={handleLogin} />} />
              )}
            </Routes>
          </Router>
        </div></GoogleOAuthProvider>
        </ThemeProvider>
       
       </ReactFlowProvider>
  );
}

export default App;
