import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SignIn = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body1">
          Welcome back! Please sign in to your account.
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn; 