import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  Code as CodeIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const problemCategories = [
  {
    title: 'Data Structures',
    description: 'Practice problems on arrays, linked lists, trees, and graphs',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    color: '#2196f3',
    count: '50+ Problems',
  },
  {
    title: 'Algorithms',
    description: 'Solve problems on sorting, searching, and dynamic programming',
    icon: <TimerIcon sx={{ fontSize: 40 }} />,
    color: '#4caf50',
    count: '40+ Problems',
  },
  {
    title: 'System Design',
    description: 'Learn to design scalable and efficient systems',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: '#ff9800',
    count: '20+ Problems',
  },
];

const CodingPractice = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Coding Practice
        </Typography>
        <Typography variant="subtitle1">
          Enhance your coding skills with our curated collection of practice problems.
        </Typography>
      </Paper>

      {/* Problem Categories */}
      <Grid container spacing={3}>
        {problemCategories.map((category) => (
          <Grid item xs={12} md={4} key={category.title}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                }
              }}
            >
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: category.color,
                  color: 'white'
                }}
              >
                {category.icon}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {category.title}
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {category.description}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {category.count}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  variant="contained"
                  sx={{ 
                    bgcolor: category.color,
                    '&:hover': {
                      bgcolor: category.color,
                      filter: 'brightness(0.9)',
                    }
                  }}
                >
                  Start Practice
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Progress Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Progress
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Problems Solved</Typography>
              <Typography variant="h4" color="primary">0</Typography>
              <Typography variant="body2" color="text.secondary">Total</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Success Rate</Typography>
              <Typography variant="h4" color="primary">0%</Typography>
              <Typography variant="body2" color="text.secondary">Average</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Time Spent</Typography>
              <Typography variant="h4" color="primary">0h</Typography>
              <Typography variant="body2" color="text.secondary">Total</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CodingPractice; 