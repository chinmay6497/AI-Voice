import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';

const steps = ['Upload Resume', 'Select Role', 'Set Preferences'];

const IT_ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Engineer',
  'Data Scientist',
  'Data Analyst',
  'Machine Learning Engineer',
  'AI Engineer',
  'Cloud Architect',
  'Security Engineer',
  'QA Engineer',
  'Mobile Developer',
  'UI/UX Designer',
  'Product Manager',
  'Technical Lead',
  'System Administrator',
  'Network Engineer',
  'Database Administrator',
  'Business Analyst',
  'Scrum Master',
  'Technical Project Manager',
  'Blockchain Developer',
  'Game Developer',
  'AR/VR Developer',
  'IoT Engineer',
  'Embedded Systems Engineer',
  'Site Reliability Engineer',
  'Technical Writer'
];

const defaultPreferences = {
  interview_types: [],
  difficulty: 'medium',
  focus_areas: []
};

const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [inputMethod, setInputMethod] = useState('upload');
  const [formData, setFormData] = useState({
    role: '',
    resume_url: '',
    resume_text: '',
    preferences: defaultPreferences
  });
  const [formError, setFormError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setFormError('');

      const profileData = {
        role: formData.role,
        resume_url: formData.resume_url,
        resume_text: inputMethod === 'manual' ? formData.resume_text : '',
        preferences: formData.preferences || defaultPreferences
      };

      await dispatch(updateProfile(profileData)).unwrap();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Onboarding error:', error);
      setFormError(error.message || 'Failed to complete onboarding');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setInputMethod(newMethod);
      setSelectedFile(null);
      setFormData(prev => ({
        ...prev,
        resume_url: '',
        resume_text: '',
      }));
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Upload your resume or enter job description to help us personalize your interview preparation.
            </Typography>
            <ToggleButtonGroup
              value={inputMethod}
              exclusive
              onChange={handleInputMethodChange}
              sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}
            >
              <ToggleButton value="upload" aria-label="upload resume">
                <UploadFileIcon sx={{ mr: 1 }} /> Upload Resume
              </ToggleButton>
              <ToggleButton value="manual" aria-label="enter manually">
                <DescriptionIcon sx={{ mr: 1 }} /> Enter Job Description
              </ToggleButton>
            </ToggleButtonGroup>

            {inputMethod === 'upload' ? (
              <Box>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Resume
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedFile(file);
                        setFormData(prev => ({
                          ...prev,
                          resume_url: URL.createObjectURL(file),
                        }));
                      }
                    }}
                  />
                </Button>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 2, color: 'success.main' }}>
                    Selected: {selectedFile.name}
                  </Typography>
                )}
              </Box>
            ) : (
              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={4}
                value={formData.resume_text}
                onChange={(e) => setFormData(prev => ({ ...prev, resume_text: e.target.value }))}
                placeholder="Paste the job description here..."
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Select your target role to focus your interview preparation.
            </Typography>
            <TextField
              fullWidth
              label="Target Role"
              select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              margin="normal"
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Target Role</option>
              {IT_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </TextField>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Set your interview preparation preferences.
            </Typography>
            <TextField
              fullWidth
              label="Difficulty Level"
              select
              value={formData.preferences?.difficulty || 'medium'}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  preferences: {
                    ...defaultPreferences,
                    ...prev.preferences,
                    difficulty: e.target.value,
                  },
                }))
              }
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </TextField>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return inputMethod === 'upload' ? !!selectedFile : !!formData.resume_text;
      case 1:
        return !!formData.role;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Complete Your Profile
        </Typography>
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {getStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting || !isStepComplete(activeStep)}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Finish'}
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleNext}
              disabled={!isStepComplete(activeStep)}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Onboarding; 