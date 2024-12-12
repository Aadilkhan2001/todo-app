import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate  } from 'react-router-dom';

import { useAuth } from '../context';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Signup successful! Please login.');
      login(data.token);
      navigate('/');
    } else {
      alert('Signup failed!');
    }
  };

  return (
    <Box sx={{ width: 300, margin: 'auto' }}>
      <h2>Signup</h2>
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button fullWidth variant="contained" onClick={handleSignup}>
        Signup
      </Button>
    </Box>
  );
};
