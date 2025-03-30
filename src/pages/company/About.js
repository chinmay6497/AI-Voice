import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Psychology as AIIcon,
  People as PeopleIcon,
  Lightbulb as InnovationIcon
} from '@mui/icons-material';

const values = [
  {
    icon: <SpeedIcon fontSize="large" />,
    title: 'Efficiency',
    description: 'We help candidates prepare faster and more effectively with AI-powered tools.'
  },
  {
    icon: <AIIcon fontSize="large" />,
    title: 'Innovation',
    description: 'Leveraging cutting-edge AI technology to revolutionize interview preparation.'
  },
  {
    icon: <PeopleIcon fontSize="large" />,
    title: 'Accessibility',
    description: 'Making professional interview preparation accessible to everyone.'
  },
  {
    icon: <InnovationIcon fontSize="large" />,
    title: 'Growth',
    description: 'Committed to continuous improvement and learning for our users.'
  }
];

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            About InterviewAI
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Revolutionizing Interview Preparation with AI Technology
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/company/careers"
          >
            Join Our Team
          </Button>
        </Container>
      </Box>

      {/* Story Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2024, InterviewAI was born from a simple observation: traditional interview preparation methods weren't keeping pace with modern hiring practices.
            </Typography>
            <Typography variant="body1" paragraph>
              We set out to create an innovative platform that combines artificial intelligence with proven interview techniques to help candidates succeed in their job interviews.
            </Typography>
            <Typography variant="body1">
              Today, we're proud to have helped thousands of candidates land their dream jobs at top companies worldwide.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/about/team.jpg"
              alt="Our Team"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Our Values
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            The principles that guide everything we do
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h2" color="primary">50K+</Typography>
            <Typography variant="h6">Users Worldwide</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h2" color="primary">95%</Typography>
            <Typography variant="h6">Success Rate</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h2" color="primary">24/7</Typography>
            <Typography variant="h6">AI Support</Typography>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" paragraph>
            Join thousands of successful candidates who have mastered their interview skills with InterviewAI.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/signup"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              href="/company/contact"
            >
              Contact Us
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 