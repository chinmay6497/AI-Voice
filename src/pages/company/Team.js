import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    image: '/images/team/sarah.jpg',
    bio: 'Former tech executive with 15+ years of experience in AI and machine learning.',
    linkedin: 'https://linkedin.com/in/sarah',
    twitter: 'https://twitter.com/sarah'
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    image: '/images/team/michael.jpg',
    bio: 'AI researcher and engineer with multiple patents in natural language processing.',
    linkedin: 'https://linkedin.com/in/michael',
    twitter: 'https://twitter.com/michael'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    image: '/images/team/emily.jpg',
    bio: 'Product leader specializing in AI-driven solutions and user experience.',
    linkedin: 'https://linkedin.com/in/emily',
    twitter: 'https://twitter.com/emily'
  },
  {
    name: 'David Kim',
    role: 'Head of Engineering',
    image: '/images/team/david.jpg',
    bio: 'Full-stack engineer with expertise in scalable AI systems.',
    linkedin: 'https://linkedin.com/in/david',
    twitter: 'https://twitter.com/david'
  }
];

const Team = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Meet Our Team
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800 }}>
            We're a diverse group of innovators passionate about transforming interview preparation through AI technology.
          </Typography>
        </Container>
      </Box>

      {/* Leadership Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Leadership Team
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Meet the visionaries leading InterviewAI
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.name}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={member.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {member.bio}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      component="a"
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      component="a"
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Join Us Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Join Our Team
              </Typography>
              <Typography variant="body1" paragraph>
                We're always looking for talented individuals who are passionate about AI, technology, and helping others succeed in their careers.
              </Typography>
              <Typography variant="body1" paragraph>
                At InterviewAI, you'll work with cutting-edge technology and collaborate with a team of experts dedicated to transforming the interview preparation landscape.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Benefits of working with us:
                </Typography>
                <ul>
                  <li>Competitive salary and equity packages</li>
                  <li>Flexible remote work options</li>
                  <li>Comprehensive health benefits</li>
                  <li>Professional development opportunities</li>
                  <li>Collaborative and innovative work environment</li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/team/office.jpg"
                alt="Our Office"
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
      </Box>
    </Box>
  );
};

export default Team; 