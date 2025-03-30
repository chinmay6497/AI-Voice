import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Pricing = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Pricing Plans
        </Typography>
        <Typography variant="body1">
          Choose the perfect plan for your interview preparation needs.
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing; 