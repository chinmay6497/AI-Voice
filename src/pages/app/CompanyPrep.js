import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CompanyPrep = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Company Preparation
        </Typography>
        <Typography variant="body1">
          Get comprehensive preparation materials for specific companies.
        </Typography>
      </Box>
    </Container>
  );
};

export default CompanyPrep; 