import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SignUp = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body1">
          Create your account to start preparing for interviews.
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp; 