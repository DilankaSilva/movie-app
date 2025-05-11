import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const DEFAULT_USERNAME = 'admin';
  const DEFAULT_PASSWORD = 'admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      setError('');
      login();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#1B263B'
    }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        width: 400, 
        height: 500,
        alignContent:'center',
        borderRadius: 'lg'

      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color:'#1B263B', fontWeight:600 }}>
          Movie Explorer
        </Typography>
        <Typography variant="h6" gutterBottom align="center" sx={{ color: '#1B263B' }}>
          Login
        </Typography>
        <Typography variant="body3" gutterBottom align="center" sx={{ color: '#1B263B' }}>
          used username and password as admin (testing)
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography variant="body2" sx={{ mt: 1, color: '#E0E1DD' }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ 
              mt: 2,
              backgroundColor: '#415A77',
              '&:hover': { backgroundColor: '#778DA9' },
              color: '#E0E1DD'
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;