import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import InsightsIcon from '@mui/icons-material/Insights';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const features = [
    {
      icon: <VideoCameraFrontIcon sx={{ fontSize: 40 }} />,
      title: 'AI Mock Interviews',
      description: 'Practice with realistic AI interviewers tailored to your target role and industry',
      link: '/mock-interview'
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Coding Practice',
      description: 'Master coding interviews with our interactive coding environment and real-time feedback',
      link: '/coding-prep'
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: 'Company Prep',
      description: 'Get company-specific interview preparation and insights',
      link: '/company-prep'
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Learning Sessions',
      description: 'Access structured learning paths and interview preparation resources',
      link: '/learning-sessions'
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      title: 'Progress Dashboard',
      description: 'Track your interview preparation progress and performance metrics',
      link: '/dashboard'
    }
  ];

  const pricingTiers = [
    {
      title: 'Basic',
      price: '29',
      description: 'Perfect for students and entry-level job seekers',
      features: [
        'Basic AI mock interviews',
        'Performance analytics',
        'Basic learning resources',
        'Email support',
      ],
    },
    {
      title: 'Professional',
      price: '79',
      description: 'For serious job seekers targeting competitive positions',
      features: [
        'Advanced AI mock interviews',
        'Detailed performance analytics',
        'Company-specific preparation',
        'Priority email & chat support',
        'Custom learning paths',
        'Interview recording & playback',
      ],
    },
    {
      title: 'Enterprise',
      price: '299',
      description: 'For universities and career centers',
      features: [
        'Unlimited AI mock interviews',
        'Advanced analytics dashboard',
        'Custom company preparation',
        '24/7 priority support',
        'Bulk user management',
        'Custom branding',
        'API access',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image: '/images/testimonials/sarah.jpg',
      content: "InterviewMaster AI helped me land my dream job at Google. The AI mock interviews were incredibly realistic and the feedback was invaluable.",
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Career Coach, Stanford University',
      image: '/images/testimonials/michael.jpg',
      content: "As a career coach, I've seen a dramatic improvement in my students' interview performance after using InterviewMaster AI.",
      rating: 5,
    },
    {
      name: 'Emily Thompson',
      role: 'HR Director, Tech Recruiter',
      image: '/images/testimonials/emily.jpg',
      content: "The platform provides excellent preparation. Candidates who use InterviewMaster AI consistently perform better in actual interviews.",
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Welcome to Interview Prep
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Practice interviews with AI and improve your skills
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {user ? (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                AI-Powered Interviews
              </Typography>
              <Typography>
                Practice with our advanced AI interviewer that adapts to your responses
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Real-time Feedback
              </Typography>
              <Typography>
                Get instant feedback on your responses and improve your interview skills
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Progress Tracking
              </Typography>
              <Typography>
                Track your progress and see your improvement over time
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4} md={4} textAlign="center">
            <Typography variant="h2" color="primary" gutterBottom>
              95%
            </Typography>
            <Typography variant="h6">
              Interview Success Rate
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} textAlign="center">
            <Typography variant="h2" color="primary" gutterBottom>
              10,000+
            </Typography>
            <Typography variant="h6">
              Interviews Conducted
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} textAlign="center">
            <Typography variant="h2" color="primary" gutterBottom>
              150%
            </Typography>
            <Typography variant="h6">
              Confidence Improvement
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Comprehensive Interview Preparation
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 8 }}>
            Everything you need to succeed in your interviews
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: feature.link ? 'pointer' : 'default',
                    '&:hover': feature.link ? {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[4],
                    } : {},
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  }}
                  onClick={() => feature.link && navigate(feature.link)}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h2" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 8 }}>
          Start with a 14-day free trial. No credit card required.
        </Typography>

        <Grid container spacing={4}>
          {pricingTiers.map((tier, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {tier.title}
                  </Typography>
                  <Typography variant="h3" component="p" gutterBottom>
                    ${tier.price}
                    <Typography component="span" variant="subtitle1">/mo</Typography>
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" paragraph>
                    {tier.description}
                  </Typography>
                  <List>
                    {tier.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} disableGutters>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 4 }}
                  >
                    Start free trial
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Success Stories
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 8 }}>
            See what our users have to say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                      <Avatar
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Stack>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Ready to ace your next interview?
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Join thousands of successful candidates who prepared with InterviewMaster AI
        </Typography>
        <Button
          component={RouterLink}
          to="/signup"
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 6, py: 2 }}
        >
          Start your free trial
        </Button>
      </Container>
    </Box>
  );
};

export default Home; 