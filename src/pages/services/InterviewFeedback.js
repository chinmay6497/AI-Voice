import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const InterviewFeedback = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Interview Feedback
        </Typography>
        <Typography variant="body1">
          Get detailed feedback and analysis of your interview performance.
        </Typography>
      </Box>
    </Container>
  );
};

export default InterviewFeedback; 