import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

const Navbar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          Interview Prep
        </Typography>

        {user ? (
          <>
            <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
              <Button
                color="inherit"
                startIcon={<VideoCallIcon />}
                onClick={() => navigate('/mock-interview')}
                sx={{ 
                  bgcolor: isActive('/mock-interview') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                Mock Interview
              </Button>
              <Button
                color="inherit"
                startIcon={<CodeIcon />}
                onClick={() => navigate('/coding-practice')}
                sx={{ 
                  bgcolor: isActive('/coding-practice') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                Coding Practice
              </Button>
              <Button
                color="inherit"
                startIcon={<SchoolIcon />}
                onClick={() => navigate('/learning')}
                sx={{ 
                  bgcolor: isActive('/learning') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                Learning
              </Button>
              <Button
                color="inherit"
                startIcon={<BusinessIcon />}
                onClick={() => navigate('/company-prep')}
                sx={{ 
                  bgcolor: isActive('/company-prep') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                Company Prep
              </Button>
            </Box>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                src={user.photoURL}
                alt={user.displayName || user.email}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose();
                navigate('/dashboard');
              }}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                handleSignOut();
              }}>
                Sign Out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 