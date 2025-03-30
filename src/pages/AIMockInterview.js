import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  IconButton,
  Alert,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const AIMockInterview = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const toggleCamera = async () => {
    try {
      if (isCameraOn) {
        stream?.getTracks().forEach(track => {
          if (track.kind === 'video') {
            track.stop();
          }
        });
        setIsCameraOn(false);
        if (isMicOn) {
          // Keep only audio track
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          videoRef.current.srcObject = audioStream;
          setStream(audioStream);
        } else {
          setStream(null);
        }
      } else {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: isMicOn 
        });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraOn(true);
      }
    } catch (err) {
      setError('Failed to access camera. Please make sure you have granted permission.');
    }
  };

  const toggleMic = async () => {
    try {
      if (isMicOn) {
        stream?.getTracks().forEach(track => {
          if (track.kind === 'audio') {
            track.stop();
          }
        });
        setIsMicOn(false);
        if (isCameraOn) {
          // Keep only video track
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = videoStream;
          setStream(videoStream);
        } else {
          setStream(null);
        }
      } else {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: isCameraOn,
          audio: true 
        });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsMicOn(true);
      }
    } catch (err) {
      setError('Failed to access microphone. Please make sure you have granted permission.');
    }
  };

  const startInterview = () => {
    if (!isCameraOn && !isMicOn) {
      setError('Please enable either camera or microphone to start the interview.');
      return;
    }
    // Add interview start logic here
  };

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
        AI Mock Interview
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '480px',
              backgroundColor: '#000',
              borderRadius: '8px',
              display: isCameraOn ? 'block' : 'none',
            }}
          />
          {!isCameraOn && (
            <Box
              sx={{
                width: '100%',
                height: '480px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" color="white">
                Camera is turned off
              </Typography>
            </Box>
          )}
          
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 2,
              p: 1,
            }}
          >
            <IconButton
              onClick={toggleCamera}
              color={isCameraOn ? 'primary' : 'error'}
            >
              {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            
            <IconButton
              onClick={toggleMic}
              color={isMicOn ? 'primary' : 'error'}
            >
              {isMicOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Stack>
        </Box>

        <Typography variant="body1" gutterBottom align="center">
          Enable either your camera or microphone to start the interview
        </Typography>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={startInterview}
            disabled={!isCameraOn && !isMicOn}
          >
            Start Interview
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Before You Begin:
      </Typography>
      <Typography variant="body1" component="div">
        <ul>
          <li>Find a quiet, well-lit space</li>
          <li>Enable at least one input device (camera or microphone)</li>
          <li>Have a professional background if using camera</li>
          <li>Be prepared for common interview questions</li>
          <li>The interview will last approximately 15-20 minutes</li>
        </ul>
      </Typography>
    </Container>
  );
};

export default AIMockInterview; 