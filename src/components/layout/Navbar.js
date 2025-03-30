import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const menuItems = {
  features: [
    { title: 'AI Mock Interviews', path: '/mock-interview' },
    { title: 'Coding Practice', path: '/coding-prep' },
    { title: 'Company Prep', path: '/company-prep' },
    { title: 'Learning Sessions', path: '/learning-sessions' },
  ],
  resources: [
    { title: 'Blog', path: '/blog' },
    { title: 'Success Stories', path: '/success-stories' },
    { title: 'Interview Tips', path: '/tips' },
    { title: 'Help Center', path: '/help' },
  ],
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, userProfile } = useSelector((state) => state.auth);
  
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [featuresAnchor, setFeaturesAnchor] = useState(null);
  const [resourcesAnchor, setResourcesAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleFeaturesClick = (event) => {
    setFeaturesAnchor(event.currentTarget);
  };

  const handleFeaturesClose = () => {
    setFeaturesAnchor(null);
  };

  const handleResourcesClick = (event) => {
    setResourcesAnchor(event.currentTarget);
  };

  const handleResourcesClose = () => {
    setResourcesAnchor(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMobileMenuClose();
    handleFeaturesClose();
    handleResourcesClose();
    handleUserMenuClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'transparent', backdropFilter: 'blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                background: (theme) => theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              InterviewMaster AI
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, ml: 4 }}>
            {isAuthenticated && (
              <Button
                color="inherit"
                onClick={() => handleNavigation('/dashboard')}
                sx={{ color: 'text.primary' }}
              >
                Dashboard
              </Button>
            )}

            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleFeaturesClick}
              sx={{ color: 'text.primary' }}
            >
              Features
            </Button>
            <Menu
              anchorEl={featuresAnchor}
              open={Boolean(featuresAnchor)}
              onClose={handleFeaturesClose}
            >
              {menuItems.features.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigation('/pricing')}
            >
              Pricing
            </Button>

            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleResourcesClick}
              sx={{ color: 'text.primary' }}
            >
              Resources
            </Button>
            <Menu
              anchorEl={resourcesAnchor}
              open={Boolean(resourcesAnchor)}
              onClose={handleResourcesClose}
            >
              {menuItems.resources.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>

            <Button
              color="inherit"
              component={RouterLink}
              to="/contact"
            >
              Contact
            </Button>
          </Box>

          <Stack direction="row" spacing={2}>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={handleUserMenuClick}
                  sx={{ ml: 2 }}
                >
                  {userProfile?.avatar ? (
                    <Avatar src={userProfile.avatar} alt={user?.name} />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {user?.name}
                    </Typography>
                    {userProfile?.targetRole && (
                      <Typography variant="body2" color="text.secondary">
                        {userProfile.targetRole}
                      </Typography>
                    )}
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => handleNavigation('/profile')}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </Stack>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuClick}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              {isAuthenticated && (
                <MenuItem onClick={() => handleNavigation('/dashboard')}>
                  Dashboard
                </MenuItem>
              )}
              {menuItems.features.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.title}
                </MenuItem>
              ))}
              {isAuthenticated ? (
                [
                  <MenuItem key="profile" onClick={() => handleNavigation('/profile')}>
                    Profile
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>,
                ]
              ) : (
                [
                  <MenuItem key="signin" onClick={() => handleNavigation('/signin')}>
                    Sign In
                  </MenuItem>,
                  <MenuItem key="signup" onClick={() => handleNavigation('/signup')}>
                    Sign Up
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 