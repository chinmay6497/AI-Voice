import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  School as SchoolIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const learningPaths = [
  {
    title: 'Data Structures & Algorithms',
    description: 'Master fundamental DSA concepts with practical examples',
    icon: <SchoolIcon />,
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming']
  },
  {
    title: 'System Design',
    description: 'Learn to design scalable distributed systems',
    icon: <BookIcon />,
    topics: ['Architecture', 'Scalability', 'Database Design', 'Load Balancing']
  },
  {
    title: 'Behavioral Interviews',
    description: 'Prepare for behavioral and leadership questions',
    icon: <VideoIcon />,
    topics: ['STAR Method', 'Leadership', 'Problem Solving', 'Team Collaboration']
  }
];

const Learning = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Learning Resources
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Comprehensive guides and materials to help you prepare for your interviews
      </Typography>

      {/* Learning Paths */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {learningPaths.map((path, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {path.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {path.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  {path.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {path.topics.map((topic, i) => (
                    <Chip key={i} label={topic} size="small" />
                  ))}
                </Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Progress Tracking */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Your Progress
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Arrays and Strings Fundamentals" 
                      secondary="Completed on June 1, 2024"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="System Design Basics" 
                      secondary="In Progress - 60% Complete"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Advanced Algorithms" 
                      secondary="Not Started"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Learning Statistics
                </Typography>
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography variant="h3" color="primary">
                    65%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Progress
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" paragraph>
                  • 3 Courses Completed
                </Typography>
                <Typography variant="body2" paragraph>
                  • 2 Courses In Progress
                </Typography>
                <Typography variant="body2">
                  • 5 Courses Remaining
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Recommended Resources */}
      <Typography variant="h4" gutterBottom>
        Recommended Resources
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/images/algorithm.jpg"
              alt="Algorithm Visualization"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Algorithm Visualization
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interactive visualizations to help you understand complex algorithms
              </Typography>
              <Button variant="text" color="primary" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/images/system-design.jpg"
              alt="System Design"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Design Patterns
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Common patterns and best practices in system design
              </Typography>
              <Button variant="text" color="primary" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/images/behavioral.jpg"
              alt="Behavioral Interview"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Behavioral Interview Guide
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive guide to ace behavioral interviews
              </Typography>
              <Button variant="text" color="primary" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Learning; 