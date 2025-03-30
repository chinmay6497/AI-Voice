import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Stack,
  CardActions,
  Paper,
  CardMedia,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  PlayArrow as PlayArrowIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Code as CodeIcon,
  VideoCameraFront as InterviewIcon,
  VideoCall as VideoCallIcon,
  MenuBook as MenuBookIcon,
  ArrowForward as ArrowForwardIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const features = [
  {
    title: 'Mock Interviews',
    description: 'Practice with AI-powered mock interviews tailored to your target role',
    icon: <VideoCallIcon sx={{ fontSize: 40 }} />,
    path: '/mock-interview',
    color: '#2196f3', // Blue
    image: '/images/mock-interview.jpg',
  },
  {
    title: 'Learning Sessions',
    description: 'Access structured learning materials and interactive tutorials',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    path: '/learning',
    color: '#4caf50', // Green
    image: '/images/learning.jpg',
  },
  {
    title: 'Company Prep',
    description: 'Company-specific interview preparation and insights',
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    path: '/company-prep',
    color: '#ff9800', // Orange
    image: '/images/company-prep.jpg',
  },
  {
    title: 'Coding Practice',
    description: 'Solve coding challenges and practice technical interviews',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    path: '/coding-practice',
    color: '#f44336', // Red
    image: '/images/coding.jpg',
  },
  {
    title: 'Interview Resources',
    description: 'Comprehensive guides, tips, and best practices',
    icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    path: '/resources',
    color: '#9c27b0', // Purple
    image: '/images/resources.jpg',
  }
];

const userStats = {
  totalInterviews: 12,
  completedInterviews: 8,
  averageScore: 4.2,
  totalPracticeTime: '18h 30m',
  upcomingInterviews: 2,
};

const skillProgress = {
  'Technical Skills': 75,
  'Communication': 85,
  'Problem Solving': 80,
  'System Design': 65,
  'Behavioral': 90,
};

const recentActivities = [
  {
    type: 'Mock Interview',
    title: 'Technical Interview Practice',
    date: '2024-03-25',
    score: 4.5,
    duration: '45 mins',
  },
  {
    type: 'Learning',
    title: 'System Design Fundamentals',
    date: '2024-03-24',
    progress: 80,
    duration: '1h 15m',
  },
  {
    type: 'Coding Practice',
    title: 'Data Structures & Algorithms',
    date: '2024-03-23',
    problemsSolved: 5,
    accuracy: '85%',
  },
];

const upcomingPrep = [
  {
    title: 'Mock System Design Interview',
    date: '2024-03-28',
    type: 'Technical',
    duration: '60 mins',
  },
  {
    title: 'Behavioral Interview Practice',
    date: '2024-03-30',
    type: 'Behavioral',
    duration: '30 mins',
  },
];

const Dashboard = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const stats = [
    {
      icon: <AssessmentIcon fontSize="large" color="primary" />,
      value: '12',
      label: 'Interviews Completed',
    },
    {
      icon: <TrendingUpIcon fontSize="large" color="primary" />,
      value: '85%',
      label: 'Average Score',
    },
    {
      icon: <ScheduleIcon fontSize="large" color="primary" />,
      value: '24h',
      label: 'Practice Time',
    },
  ];

  const upcomingInterviews = [
    {
      company: 'Tech Corp',
      role: 'Senior Developer',
      date: '2024-03-15',
      time: '10:00 AM',
    },
    {
      company: 'AI Solutions',
      role: 'ML Engineer',
      date: '2024-03-18',
      time: '2:00 PM',
    },
  ];

  const learningProgress = [
    { topic: 'System Design', progress: 75 },
    { topic: 'Algorithms', progress: 60 },
    { topic: 'Behavioral Questions', progress: 90 },
  ];

  const quickActions = [
    {
      icon: <PlayArrowIcon />,
      title: 'Start Mock Interview',
      path: '/mock-interview',
    },
    {
      icon: <SchoolIcon />,
      title: 'Continue Learning',
      path: '/learning',
    },
    {
      icon: <BusinessIcon />,
      title: 'Company Research',
      path: '/company-prep',
    },
    {
      icon: <CodeIcon />,
      title: 'Practice Coding',
      path: '/coding-prep',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={user?.photoURL} 
            alt={user?.displayName || user?.email}
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography variant="h5" component="h1">
              Welcome, {user?.displayName || user?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Button variant="outlined" color="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>

      {/* Welcome Section */}
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
          Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
        </Typography>
        <Typography variant="subtitle1">
          Track your interview preparation progress and upcoming sessions.
        </Typography>
      </Paper>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Progress
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {userStats.totalInterviews}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Interviews
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {userStats.averageScore}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Score
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {userStats.totalPracticeTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Practice Time
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Sessions
            </Typography>
            <List>
              {upcomingPrep.map((session, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ScheduleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={session.title}
                    secondary={`${session.date} • ${session.duration}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Skill Progress */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Skill Progress
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(skillProgress).map(([skill, progress]) => (
            <Grid item xs={12} sm={6} md={4} key={skill}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{skill}</Typography>
                  <Typography variant="body2">{progress}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: progress > 80 ? '#4caf50' : progress > 60 ? '#ff9800' : '#f44336',
                    }
                  }} 
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Activity */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Recent Activity
          </Typography>
          <Button 
            color="primary" 
            endIcon={<TimelineIcon />}
            onClick={() => handleNavigation('/activity')}
          >
            View All
          </Button>
        </Box>
        <List>
          {recentActivities.map((activity, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  {activity.type === 'Mock Interview' ? (
                    <VideoCallIcon color="primary" />
                  ) : activity.type === 'Learning' ? (
                    <SchoolIcon color="primary" />
                  ) : (
                    <CodeIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={activity.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {activity.date}
                      </Typography>
                      {activity.score && (
                        <Chip
                          size="small"
                          icon={<StarIcon />}
                          label={`Score: ${activity.score}`}
                          sx={{ ml: 1 }}
                        />
                      )}
                      {activity.progress && (
                        <Chip
                          size="small"
                          icon={<TrendingUpIcon />}
                          label={`Progress: ${activity.progress}%`}
                          sx={{ ml: 1 }}
                        />
                      )}
                      {activity.problemsSolved && (
                        <Chip
                          size="small"
                          icon={<CheckCircleIcon />}
                          label={`Solved: ${activity.problemsSolved}`}
                          sx={{ ml: 1 }}
                        />
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#2196f3', mr: 2 }}>
                  <VideoCallIcon />
                </Avatar>
                <Typography variant="h6">
                  Mock Interview
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Practice with AI-powered interviews
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                onClick={() => handleNavigation('/mock-interview')}
              >
                Start Practice
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                  <CodeIcon />
                </Avatar>
                <Typography variant="h6">
                  Coding Practice
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Solve algorithmic challenges
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                onClick={() => handleNavigation('/coding-practice')}
              >
                Start Coding
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800', mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Typography variant="h6">
                  Company Prep
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Company-specific preparation
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                onClick={() => handleNavigation('/company-prep')}
              >
                Get Started
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#f44336', mr: 2 }}>
                  <MenuBookIcon />
                </Avatar>
                <Typography variant="h6">
                  Resources
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Access learning materials
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                onClick={() => handleNavigation('/resources')}
              >
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 