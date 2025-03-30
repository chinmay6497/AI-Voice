import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Blog = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1">
          Stay updated with the latest interview tips, industry insights, and success stories.
        </Typography>
      </Box>
    </Container>
  );
};

export default Blog; 