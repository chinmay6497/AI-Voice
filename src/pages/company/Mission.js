import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  EmojiObjects as VisionIcon,
  Flag as MissionIcon,
  Stars as GoalsIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const goals = [
  'Help 1 million candidates ace their interviews by 2025',
  'Expand our AI technology to support interviews in 20+ languages',
  'Achieve 98% user satisfaction rate',
  'Partner with 500+ top companies worldwide',
  'Develop advanced behavioral analysis capabilities'
];

const Mission = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800 }}>
            To democratize interview preparation and help every candidate reach their full potential through innovative AI technology.
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 4 }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                <MissionIcon fontSize="large" />
              </Box>
              <Typography variant="h4" gutterBottom>
                Mission Statement
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to revolutionize the way people prepare for interviews by providing accessible, personalized, and effective AI-powered tools that build confidence and improve success rates.
              </Typography>
              <Typography variant="body1">
                We believe that everyone deserves the opportunity to present their best self in interviews, regardless of their background or experience level.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 4 }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                <VisionIcon fontSize="large" />
              </Box>
              <Typography variant="h4" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a future where interview preparation is personalized, efficient, and accessible to everyone. A world where AI technology helps level the playing field in the job market.
              </Typography>
              <Typography variant="body1">
                Our platform aims to be the gold standard in interview preparation, combining cutting-edge AI with human expertise.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Strategic Goals Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <GoalsIcon fontSize="large" color="primary" />
            <Typography variant="h3" gutterBottom>
              Strategic Goals
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Our ambitious targets for the next few years
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}>
              <List>
                {goals.map((goal, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={goal}
                      primaryTypographyProps={{
                        variant: 'h6',
                        gutterBottom: true
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Impact Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Our Impact
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" color="primary" gutterBottom>
                50K+
              </Typography>
              <Typography variant="h6">
                Successful Interviews
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" color="primary" gutterBottom>
                200+
              </Typography>
              <Typography variant="h6">
                Companies Hiring Our Users
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h2" color="primary" gutterBottom>
                95%
              </Typography>
              <Typography variant="h6">
                User Satisfaction Rate
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Join Us Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Join Our Mission
          </Typography>
          <Typography variant="h6" paragraph>
            Be part of the revolution in interview preparation and career development.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/signup"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              href="/company/careers"
            >
              View Careers
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Mission; 