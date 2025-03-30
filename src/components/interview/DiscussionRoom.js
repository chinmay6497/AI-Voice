import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Send,
} from '@mui/icons-material';
import AIVoice from '../ai/AIVoice';

const DiscussionRoom = ({ onEndInterview }) => {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      stopRecording();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const toggleMic = () => {
    setIsMicEnabled(!isMicEnabled);
    if (videoRef.current?.srcObject) {
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicEnabled;
      }
    }
  };

  const toggleCamera = () => {
    setIsCameraEnabled(!isCameraEnabled);
    if (videoRef.current?.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraEnabled;
      }
    }
  };

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;

    const mediaRecorder = new MediaRecorder(videoRef.current.srcObject);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      // Here you would send the audioBlob to your speech-to-text service
      // For now, we'll just simulate it
      setIsLoading(true);
      setTimeout(() => {
        setTranscript('Sample transcript from speech-to-text service');
        setIsLoading(false);
      }, 2000);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = () => {
    if (!transcript.trim()) return;

    setMessages(prev => [...prev, { text: transcript, sender: 'user' }]);
    setTranscript('');
    // Here you would send the message to your AI service
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'This is a sample AI response',
        sender: 'ai'
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Box sx={{ position: 'relative', height: '100%' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
                <IconButton onClick={toggleMic} color={isMicEnabled ? 'primary' : 'error'}>
                  {isMicEnabled ? <Mic /> : <MicOff />}
                </IconButton>
                <IconButton onClick={toggleCamera} color={isCameraEnabled ? 'primary' : 'error'}>
                  {isCameraEnabled ? <Videocam /> : <VideocamOff />}
                </IconButton>
                <IconButton onClick={isRecording ? stopRecording : startRecording} color={isRecording ? 'error' : 'primary'}>
                  <Mic />
                </IconButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={onEndInterview}
                  sx={{ ml: 2 }}
                >
                  End Interview
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Conversation
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      maxWidth: '80%',
                      bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                    {message.sender === 'ai' && (
                      <AIVoice text={message.text} />
                    )}
                  </Paper>
                </Box>
              ))}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your message..."
                style={{ flexGrow: 1, padding: '8px' }}
              />
              <IconButton onClick={handleSendMessage} color="primary">
                <Send />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiscussionRoom; 