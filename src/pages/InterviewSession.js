import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  CallEnd as CallEndIcon,
} from '@mui/icons-material';

// Constants
const ASSEMBLY_AI_ENDPOINT = 'wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000';

const TranscriptMessage = ({ message, isUser, timestamp }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 2,
      mb: 2,
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}
  >
    <Avatar
      src={isUser ? null : "/mentors/mentor1.avif"}
      sx={{ width: 40, height: 40 }}
    >
      {isUser ? "U" : "AI"}
    </Avatar>
    <Box
      sx={{
        maxWidth: '80%',
        p: 2,
        borderRadius: 2,
        bgcolor: isUser ? 'primary.light' : 'grey.100',
        color: isUser ? 'common.white' : 'text.primary',
      }}
    >
      <Typography variant="body1">{message}</Typography>
      <Typography variant="caption" color={isUser ? 'grey.200' : 'text.secondary'}>
        {timestamp}
      </Typography>
    </Box>
  </Box>
);

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [transcript, setTranscript] = useState([
    {
      id: 1,
      message: "Hello! I'm your AI interviewer today. Could you tell me about your experience with software development?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const transcriptRef = useRef(null);
  const socketRef = useRef(null);
  const recorderRef = useRef(null);
  const interviewType = location.state?.interviewType || 'Technical Interview';

  useEffect(() => {
    startMedia();
    setupSpeechRecognition();
    return () => {
      stopMedia();
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (recorderRef.current) {
        recorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const setupSpeechRecognition = async () => {
    try {
      const socket = new WebSocket(ASSEMBLY_AI_ENDPOINT);
      
      socket.onopen = () => {
        socket.send(JSON.stringify({
          token: process.env.REACT_APP_ASSEMBLY_AI_KEY,
          expires_in: 3600
        }));
        startRecording(socket);
      };
      
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message_type === 'FinalTranscript') {
          // Add user's speech to transcript
          setTranscript(prev => [...prev, {
            id: Date.now(),
            message: data.text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString(),
          }]);
          handleUserInput(data.text);
        }
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
      
      socketRef.current = socket;
    } catch (error) {
      console.error('Error setting up speech recognition:', error);
    }
  };

  const startRecording = async (socket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      recorder.ondataavailable = (event) => {
        if (socket.readyState === WebSocket.OPEN && event.data.size > 0) {
          socket.send(event.data);
        }
      };
      
      recorder.start(250);
      recorderRef.current = recorder;
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setIsMicOn(false);
      setIsVideoOn(false);
    }
  };

  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleMicToggle = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  const handleVideoToggle = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  const handleEndCall = () => {
    stopMedia();
    if (socketRef.current) {
      socketRef.current.close();
    }
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
    navigate('/interview-feedback', {
      state: {
        transcript,
        interviewType
      }
    });
  };

  const handleUserInput = async (userText) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are an expert interviewer for ${interviewType} positions. 
                       Conduct a professional interview, asking relevant questions. 
                       Keep responses concise (1-3 sentences).`
            },
            {
              role: 'user',
              content: userText
            }
          ]
        })
      });

      const data = await response.json();
      
      // Add AI response to transcript
      setTranscript(prev => [...prev, {
        id: Date.now(),
        message: data.message,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }]);

      // Convert to speech
      await convertTextToSpeech(data.message);
    } catch (error) {
      console.error('Error processing user input:', error);
    }
  };

  // Convert text to speech using Amazon Polly
  const convertTextToSpeech = async (text) => {
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          voiceId: 'Joanna',
          engine: 'neural'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to convert text to speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      await audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Error converting text to speech:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="interview-session"
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* Left Section - Video Conference */}
      <Box
        sx={{
          flex: isMobile ? 'none' : 1,
          height: isMobile ? '50vh' : '100vh',
          p: 3,
        }}
      >
        <Paper 
          elevation={2}
          sx={{ 
            height: '100%',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: '#1a1a1a',
          }}
        >
          {/* AI Interviewer */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Avatar
              src="/mentors/mentor1.avif"
              sx={{
                width: 120,
                height: 120,
                mb: 2,
              }}
            />
            <Typography variant="h6" color="white">
              AI Interviewer
            </Typography>
          </Box>

          {/* User Video */}
          <Box
            sx={{ 
              position: 'absolute',
              bottom: 20,
              right: 20,
              width: '280px',
              height: '210px',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: '#2a2a2a',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: isVideoOn ? 'block' : 'none',
              }}
            />
            {!isVideoOn && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" color="white">
                  Camera Off
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Right Section - Transcript */}
      <Box
        sx={{
          width: isMobile ? '100%' : '40%',
          height: isMobile ? '50vh' : '100vh',
          p: 3,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            height: '100%',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Interview Transcript</Typography>
          </Box>
          <Box
            ref={transcriptRef}
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              bgcolor: 'background.default',
            }}
          >
            {transcript.map((msg) => (
              <TranscriptMessage
                key={msg.id}
                message={msg.message}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
          </Box>
        </Paper>
      </Box>
      
      {/* Control Buttons */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          zIndex: 1000,
        }}
      >
        <Tooltip title={isMicOn ? 'Turn off microphone' : 'Turn on microphone'}>
          <IconButton 
            size="large"
            onClick={handleMicToggle}
            sx={{ 
              width: 56,
              height: 56,
              bgcolor: isMicOn ? 'primary.main' : 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: isMicOn ? 'primary.dark' : 'error.dark',
              },
            }}
          >
            {isMicOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}>
          <IconButton
            size="large"
            onClick={handleVideoToggle}
            sx={{ 
              width: 56,
              height: 56,
              bgcolor: isVideoOn ? 'primary.main' : 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: isVideoOn ? 'primary.dark' : 'error.dark',
              },
            }}
          >
            {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="End interview">
          <IconButton
            size="large"
            onClick={handleEndCall}
            sx={{ 
              width: 56,
              height: 56,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.dark' },
            }}
          >
            <CallEndIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </motion.div>
  );
};

export default InterviewSession; 