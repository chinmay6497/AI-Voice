import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Learning = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Learning Center
        </Typography>
        <Typography variant="body1">
          Access comprehensive learning resources and tutorials.
        </Typography>
      </Box>
    </Container>
  );
};

export default Learning; 