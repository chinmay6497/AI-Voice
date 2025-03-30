import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Alert,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Pause as PauseIcon,
  Send as SendIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { interviewService } from '../services/interviewService';

const interviewTypes = [
  {
    title: 'Behavioral Interview',
    description: 'Practice common behavioral questions about your past experiences',
    icon: '👥',
    type: 'behavioral'
  },
  {
    title: 'Technical Interview',
    description: 'Solve coding problems and explain your technical decisions',
    icon: '💻',
    type: 'technical'
  },
  {
    title: 'Full Interview',
    description: 'Complete interview simulation with both behavioral and technical questions',
    icon: '🎯',
    type: 'full'
  }
];

const MockInterview = () => {
  const { user } = useAuth();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoChunks, setVideoChunks] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    if (selectedType) {
      loadQuestions(selectedType);
    }
  }, [selectedType]);

  useEffect(() => {
    if (user) {
      loadInterviewHistory();
    }
  }, [user]);

  const loadQuestions = async (type) => {
    try {
      const questions = await interviewService.getInterviewQuestions(type);
      setQuestions(questions);
      setCurrentQuestionIndex(0);
    } catch (error) {
      setError('Failed to load interview questions');
    }
  };

  const loadInterviewHistory = async () => {
    try {
      const history = await interviewService.getInterviewHistory(user.uid);
      setInterviewHistory(history);
    } catch (error) {
      setError('Failed to load interview history');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
          setVideoChunks(chunks);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      setError('Failed to access camera and microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleSubmit = async () => {
    if (!videoChunks.length) {
      setError('No recording to submit');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
      const recordingUrl = await interviewService.uploadRecording(videoBlob, user.uid);

      // Simulate AI feedback (replace with actual AI integration)
      const feedbackData = {
        type: selectedType,
        recordingUrl,
        feedback: 'Your interview performance was strong overall. You demonstrated good communication skills and technical knowledge.',
        score: 85,
        strengths: ['Clear communication', 'Technical knowledge', 'Problem-solving approach'],
        improvements: ['Time management', 'Code optimization', 'Edge case handling']
      };

      await interviewService.saveInterviewRecording(user.uid, feedbackData);
      setFeedbackData(feedbackData);
      setShowFeedbackDialog(true);
      await loadInterviewHistory();
    } catch (error) {
      setError('Failed to submit recording');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Video Recording Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 600 }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black', borderRadius: 1, overflow: 'hidden' }}>
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {!isRecording && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  <Typography variant="h6">Camera Preview</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Interview Type Selection and Questions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 600 }}>
            <Typography variant="h6" gutterBottom>
              Interview Type
            </Typography>
            <Box sx={{ mb: 3 }}>
              {interviewTypes.map((type) => (
                <Card
                  key={type.type}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    bgcolor: selectedType === type.type ? 'primary.light' : 'background.paper',
                    '&:hover': { bgcolor: 'primary.light' }
                  }}
                  onClick={() => setSelectedType(type.type)}
                >
                  <CardContent>
                    <Typography variant="h6">{type.icon} {type.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {selectedType && questions.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Current Question
                </Typography>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body1">
                      {questions[currentQuestionIndex].question}
                    </Typography>
                    {questions[currentQuestionIndex].hints && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Hints:
                        </Typography>
                        <List dense>
                          {questions[currentQuestionIndex].hints.map((hint, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={hint} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </CardContent>
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                  <Button
                    variant="outlined"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={currentQuestionIndex === questions.length - 1}
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        {/* Recording Controls */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color={isRecording ? 'error' : 'primary'}
              startIcon={isRecording ? <StopIcon /> : <PlayIcon />}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            {isRecording && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={isPaused ? <PlayIcon /> : <PauseIcon />}
                onClick={isPaused ? resumeRecording : pauseRecording}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!videoChunks.length || isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Submit for Feedback'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<HistoryIcon />}
              onClick={() => setShowHistory(true)}
            >
              View History
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Feedback Dialog */}
      <Dialog
        open={showFeedbackDialog}
        onClose={() => setShowFeedbackDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Interview Feedback</DialogTitle>
        <DialogContent>
          {feedbackData && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Overall Score: {feedbackData.score}/100
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Feedback:
              </Typography>
              <Typography paragraph>{feedbackData.feedback}</Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Strengths:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {feedbackData.strengths.map((strength, index) => (
                  <Chip
                    key={index}
                    icon={<CheckCircleIcon />}
                    label={strength}
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Stack>

              <Typography variant="subtitle1" gutterBottom>
                Areas for Improvement:
              </Typography>
              <Stack direction="row" spacing={1}>
                {feedbackData.improvements.map((improvement, index) => (
                  <Chip
                    key={index}
                    icon={<WarningIcon />}
                    label={improvement}
                    color="warning"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFeedbackDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* History Dialog */}
      <Dialog
        open={showHistory}
        onClose={() => setShowHistory(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Interview History</DialogTitle>
        <DialogContent>
          <List>
            {interviewHistory.map((interview, index) => (
              <React.Fragment key={interview.id}>
                <ListItem>
                  <ListItemText
                    primary={`${interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview`}
                    secondary={formatDate(interview.created_at)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => {
                      setFeedbackData(interview);
                      setShowFeedbackDialog(true);
                      setShowHistory(false);
                    }}>
                      <PlayIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < interviewHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHistory(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MockInterview; 
