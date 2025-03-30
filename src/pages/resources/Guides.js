import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Guides = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Interview Guides
        </Typography>
        <Typography variant="body1">
          Comprehensive guides to help you prepare for different types of interviews.
        </Typography>
      </Box>
    </Container>
  );
};

export default Guides; 