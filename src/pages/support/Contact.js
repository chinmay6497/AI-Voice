import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          Get in touch with our team for any questions or concerns.
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact; 