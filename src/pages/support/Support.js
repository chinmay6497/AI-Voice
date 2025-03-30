import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Support = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Support Center
        </Typography>
        <Typography variant="body1">
          Get help with your account, technical issues, or general inquiries.
        </Typography>
      </Box>
    </Container>
  );
};

export default Support; 