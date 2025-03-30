import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
  Skeleton,
  LinearProgress,
} from '@mui/material';
import PropTypes from 'prop-types';

export const LoadingOverlay = ({ open, message }) => (
  <Backdrop
    sx={{
      color: '#fff',
      zIndex: (theme) => theme.zIndex.drawer + 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
    open={open}
  >
    <CircularProgress color="inherit" />
    {message && (
      <Typography variant="h6" color="inherit">
        {message}
      </Typography>
    )}
  </Backdrop>
);

export const LoadingSpinner = ({ size = 40, color = 'primary' }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
    }}
  >
    <CircularProgress size={size} color={color} />
  </Box>
);

export const LoadingCard = ({ width = '100%', height = 200 }) => (
  <Box sx={{ width, height }}>
    <Skeleton variant="rectangular" width="100%" height={height} animation="wave" />
  </Box>
);

export const LoadingText = ({ lines = 3, width = '100%' }) => (
  <Box sx={{ width }}>
    {Array(lines)
      .fill(0)
      .map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '80%' : '100%'}
          animation="wave"
        />
      ))}
  </Box>
);

export const LoadingList = ({ items = 5, height = 60 }) => (
  <Box sx={{ width: '100%' }}>
    {Array(items)
      .fill(0)
      .map((_, index) => (
        <Box key={index} sx={{ display: 'flex', mb: 1 }}>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
            sx={{ mr: 1 }}
          />
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width="80%" animation="wave" />
            <Skeleton variant="text" width="60%" animation="wave" />
          </Box>
        </Box>
      ))}
  </Box>
);

export const LoadingAvatar = ({ size = 40 }) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    animation="wave"
  />
);

export const LoadingButton = ({ width = 100, height = 36 }) => (
  <Skeleton
    variant="rectangular"
    width={width}
    height={height}
    animation="wave"
    sx={{ borderRadius: 1 }}
  />
);

const Loading = ({ variant = 'circular', size = 40, color = 'primary', ...props }) => {
  switch (variant) {
    case 'circular':
      return <CircularProgress size={size} color={color} {...props} />;
    case 'linear':
      return <LinearProgress color={color} {...props} />;
    case 'skeleton':
      return <Skeleton variant="rectangular" width="100%" height={size} {...props} />;
    default:
      return <CircularProgress size={size} color={color} {...props} />;
  }
};

Loading.propTypes = {
  variant: PropTypes.oneOf(['circular', 'linear', 'skeleton']),
  size: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
};

export default Loading; 