import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Settings = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Settings page content will be implemented here.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings; 