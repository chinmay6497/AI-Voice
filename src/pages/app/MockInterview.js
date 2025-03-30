import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MockInterview = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Mock Interview
        </Typography>
        <Typography variant="body1">
          Practice your interview skills with our AI-powered mock interview system.
        </Typography>
      </Box>
    </Container>
  );
};

export default MockInterview; 