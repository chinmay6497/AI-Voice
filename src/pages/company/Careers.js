import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  WorkOutline as JobIcon,
  LocationOn as LocationIcon,
  Timer as TimerIcon,
  Check as CheckIcon
} from '@mui/icons-material';

const jobOpenings = [
  {
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead the development of our AI-powered interview simulation and feedback systems.',
    requirements: [
      'PhD or MS in Computer Science, AI, or related field',
      '5+ years of experience in ML/AI development',
      'Expertise in NLP and speech recognition',
      'Strong Python and deep learning framework experience'
    ]
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Drive the product strategy and roadmap for our interview preparation platform.',
    requirements: [
      '5+ years of product management experience',
      'Experience with AI/ML products',
      'Strong analytical and communication skills',
      'Track record of successful product launches'
    ]
  },
  {
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and maintain our web application and backend services.',
    requirements: [
      '3+ years of full stack development experience',
      'Proficiency in React, Node.js, and modern web technologies',
      'Experience with cloud services (AWS/GCP)',
      'Understanding of CI/CD practices'
    ]
  }
];

const benefits = [
  'Competitive salary and equity package',
  'Remote-first work environment',
  'Comprehensive health, dental, and vision coverage',
  'Unlimited PTO policy',
  'Professional development budget',
  '401(k) matching',
  'Home office setup allowance',
  'Regular team retreats and events'
];

const Careers = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Join Our Mission
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mb: 4 }}>
            Help us revolutionize interview preparation and empower millions of job seekers worldwide.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="#openings"
          >
            View Open Positions
          </Button>
        </Container>
      </Box>

      {/* Culture Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Our Culture
            </Typography>
            <Typography variant="body1" paragraph>
              At InterviewAI, we're building a culture of innovation, collaboration, and continuous learning. We believe in empowering our team members to take ownership of their work and make a real impact.
            </Typography>
            <Typography variant="body1" paragraph>
              We value diversity, inclusion, and work-life balance. Our remote-first approach allows us to hire the best talent from anywhere in the world while providing the flexibility to work in ways that best suit each individual.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/careers/culture.jpg"
              alt="Company Culture"
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

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Benefits & Perks
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            We take care of our team so they can focus on what matters
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Job Openings Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="openings">
        <Typography variant="h3" gutterBottom>
          Open Positions
        </Typography>
        <Grid container spacing={4}>
          {jobOpenings.map((job, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h5" gutterBottom>
                        {job.title}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          icon={<JobIcon />}
                          label={job.department}
                          size="small"
                        />
                        <Chip
                          icon={<LocationIcon />}
                          label={job.location}
                          size="small"
                        />
                        <Chip
                          icon={<TimerIcon />}
                          label={job.type}
                          size="small"
                        />
                      </Stack>
                      <Typography variant="body1" paragraph>
                        {job.description}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Requirements:
                      </Typography>
                      <List>
                        {job.requirements.map((req, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CheckIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={req} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href={`/careers/apply/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        Apply Now
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Careers; 