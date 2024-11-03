import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ReactIconmd from 'react-icons/md';
import * as ReactIcon from 'react-icons/gr';
import { GoogleLogin } from '@react-oauth/google';
import { Container, Paper, Typography, TextField, Button, Grid, Box } from '@mui/material';



  const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', username, password);

     
      onLogin({id:username,password:password,type:"password"},true);
     
       
      }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login authentication logic here
    // Replace the following condition with your authentication logic
    if(username==="123" && password==="abc"){
    
    onLogin({ID:username,password:password,type:"password"},true);
    }
  };

  return (
    <div className='backdrop'>
         <video className="videobg" autoPlay loop muted src="https://adappter.xyz/videos/background.mp4" type='video/mp4' />
    <div className="login-container">
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* Add additional components like "Forgot password" link or "Sign up" option here */}
  
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    onLogin({id:credentialResponse.clientId,password:credentialResponse.credential,type:"google"},true);
    localStorage.session=credentialResponse.credential;
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
            </Box>
      </Paper>
      <h1>Something</h1>
    </Container>
      </div>
    </div>
  );
};

export default Login;
