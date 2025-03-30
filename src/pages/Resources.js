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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MenuBook as MenuBookIcon,
  VideoLibrary as VideoIcon,
  Description as DocumentIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const resourceCategories = [
  {
    title: 'Interview Guides',
    description: 'Comprehensive guides for different types of interviews',
    icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    color: '#2196f3',
    items: [
      'Technical Interview Guide',
      'Behavioral Interview Guide',
      'System Design Interview Guide',
      'Coding Interview Preparation',
    ],
  },
  {
    title: 'Video Tutorials',
    description: 'Watch expert tutorials and interview tips',
    icon: <VideoIcon sx={{ fontSize: 40 }} />,
    color: '#4caf50',
    items: [
      'Interview Best Practices',
      'Common Pitfalls to Avoid',
      'Mock Interview Examples',
      'Expert Tips and Tricks',
    ],
  },
  {
    title: 'Practice Materials',
    description: 'Sample questions and practice exercises',
    icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
    color: '#ff9800',
    items: [
      'Technical Questions Bank',
      'Behavioral Questions List',
      'System Design Problems',
      'Take-home Assignments',
    ],
  },
];

const Resources = () => {
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
          Interview Resources
        </Typography>
        <Typography variant="subtitle1">
          Access our comprehensive collection of interview preparation materials.
        </Typography>
      </Paper>

      {/* Resource Categories */}
      <Grid container spacing={3}>
        {resourceCategories.map((category) => (
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
                <List>
                  {category.items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <DocumentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
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
                  View Resources
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured Resources */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Resources
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Interview Trends
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stay updated with the latest interview trends and practices in the tech industry.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interview Preparation Checklist
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A comprehensive checklist to ensure you're fully prepared for your interview.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Resources; 