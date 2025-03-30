import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CodingPrep = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Coding Preparation
        </Typography>
        <Typography variant="body1">
          Practice coding problems and improve your technical interview skills.
        </Typography>
      </Box>
    </Container>
  );
};

export default CodingPrep; 