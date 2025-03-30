import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  School as SchoolIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { db } from '../lib/supabase';

const topics = [
  {
    id: 1,
    title: 'System Design Fundamentals',
    description: 'Learn the basics of system design and architecture',
    progress: 60,
    modules: [
      { id: 1, title: 'Introduction to System Design', completed: true },
      { id: 2, title: 'Scalability', completed: true },
      { id: 3, title: 'Load Balancing', completed: false },
      { id: 4, title: 'Caching', completed: false },
    ],
    category: 'system-design',
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    description: 'Master common data structures and algorithms',
    progress: 40,
    modules: [
      { id: 1, title: 'Arrays and Strings', completed: true },
      { id: 2, title: 'Linked Lists', completed: true },
      { id: 3, title: 'Trees and Graphs', completed: false },
      { id: 4, title: 'Dynamic Programming', completed: false },
    ],
    category: 'algorithms',
  },
  {
    id: 3,
    title: 'Object-Oriented Design',
    description: 'Learn OOP principles and design patterns',
    progress: 20,
    modules: [
      { id: 1, title: 'OOP Basics', completed: true },
      { id: 2, title: 'Design Patterns', completed: false },
      { id: 3, title: 'SOLID Principles', completed: false },
      { id: 4, title: 'Case Studies', completed: false },
    ],
    category: 'design',
  },
];

const LearningSessions = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [bookmarkedTopics, setBookmarkedTopics] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch user's learning progress
    const fetchProgress = async () => {
      try {
        const progress = await db.getLearningProgress(user.id);
        // Update progress state
      } catch (error) {
        console.error('Error fetching learning progress:', error);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleBookmark = (topicId) => {
    if (bookmarkedTopics.includes(topicId)) {
      setBookmarkedTopics(bookmarkedTopics.filter(id => id !== topicId));
    } else {
      setBookmarkedTopics([...bookmarkedTopics, topicId]);
    }
  };

  const handleCloseDialog = () => {
    setSelectedTopic(null);
  };

  const renderTopicCard = (topic) => (
    <Grid item xs={12} md={6} lg={4} key={topic.id}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" gutterBottom>
              {topic.title}
            </Typography>
            <IconButton onClick={() => handleBookmark(topic.id)}>
              {bookmarkedTopics.includes(topic.id) ? <BookmarkedIcon color="primary" /> : <BookmarkIcon />}
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {topic.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Progress: {topic.progress}%
            </Typography>
            <LinearProgress variant="determinate" value={topic.progress} sx={{ mt: 1 }} />
          </Box>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={() => handleTopicClick(topic)}
            fullWidth
          >
            Continue Learning
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Learning Sessions
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="All Topics" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
          <Tab label="Bookmarked" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {topics.map(renderTopicCard)}
      </Grid>

      {/* Topic Details Dialog */}
      <Dialog open={Boolean(selectedTopic)} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedTopic && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedTopic.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {selectedTopic.description}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <List>
                {selectedTopic.modules.map((module) => (
                  <ListItem key={module.id}>
                    <ListItemIcon>
                      {module.completed ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <LockIcon color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={module.title}
                      secondary={module.completed ? 'Completed' : 'Locked'}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={!module.completed && selectedTopic.modules[module.id - 2]?.completed !== true}
                      >
                        {module.completed ? 'Review' : 'Start'}
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary">
                Continue Learning
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default LearningSessions; 