import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Chip,
  Rating,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, fetchUserProfile } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { mentors } from '../data/mentors';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  backgroundColor: theme.palette.primary.main,
  fontSize: '2rem',
}));

const MentorCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const { user, profile, isLoading, error } = useSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
  });
  const [formError, setFormError] = useState('');

  const [interviewHistory] = useState([
    {
      id: 1,
      type: 'System Design',
      date: '2024-03-15',
      score: 85,
      feedback: 'Good understanding of scalability concepts',
    },
    {
      id: 2,
      type: 'Data Structures',
      date: '2024-03-10',
      score: 90,
      feedback: 'Excellent problem-solving approach',
    },
  ]);

  const [learningProgress] = useState([
    {
      topic: 'System Design',
      progress: 75,
      completedModules: 6,
      totalModules: 8,
    },
    {
      topic: 'Algorithms',
      progress: 60,
      completedModules: 12,
      totalModules: 20,
    },
  ]);

  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        role: profile.role || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      await dispatch(updateProfile(formData)).unwrap();
    } catch (error) {
      setFormError(error.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
    setFormError('');
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <StyledAvatar>U</StyledAvatar>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {formData.email}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Profile Settings
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled
              />
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Available Mentors
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Choose from our experienced mentors based on your interview preparation needs
        </Typography>
        <Grid container spacing={4}>
          {mentors.map((mentor) => (
            <Grid item xs={12} md={6} lg={3} key={mentor.id}>
              <MentorCard>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={mentor.avatar}
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {mentor.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {mentor.role}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={mentor.rating} readOnly precision={0.1} />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({mentor.rating})
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {mentor.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Expertise:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {mentor.expertise.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{mentor.availability}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {mentor.totalInterviews} interviews conducted
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mx: 2, mb: 2 }}
                  >
                    Schedule Interview
                  </Button>
                </CardActions>
              </MentorCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 