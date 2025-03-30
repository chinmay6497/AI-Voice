import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  QuestionAnswer as QuestionIcon,
  Support as SupportIcon,
  Mail as MailIcon
} from '@mui/icons-material';

const faqCategories = [
  'General',
  'Account',
  'Pricing',
  'Technical',
  'AI Features',
  'Interview Process'
];

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is InterviewAI?',
        answer: 'InterviewAI is an AI-powered platform that helps candidates prepare for job interviews through mock interviews, personalized feedback, and comprehensive learning resources.'
      },
      {
        question: 'How does InterviewAI work?',
        answer: 'Our platform uses advanced AI technology to simulate realistic interview scenarios, analyze your responses, and provide detailed feedback on your performance, including aspects like content, delivery, and body language.'
      },
      {
        question: 'Is InterviewAI suitable for all types of interviews?',
        answer: 'Yes, InterviewAI supports various interview types including technical, behavioral, and company-specific interviews across different industries and roles.'
      }
    ]
  },
  {
    category: 'Account',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Simply click the "Sign Up" button, enter your email address, create a password, and follow the verification process. You can start using the platform immediately after registration.'
      },
      {
        question: 'Can I use InterviewAI on multiple devices?',
        answer: 'Yes, you can access your InterviewAI account from any device with an internet connection. Your progress and settings will sync across all devices.'
      }
    ]
  },
  {
    category: 'Pricing',
    questions: [
      {
        question: 'Is there a free trial?',
        answer: 'Yes, we offer a 7-day free trial that gives you full access to all features. No credit card is required to start the trial.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for business accounts.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'What technical requirements do I need?',
        answer: 'You need a modern web browser, stable internet connection, and a webcam and microphone for mock interviews. We recommend using Chrome or Firefox for the best experience.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your data. All interview recordings and personal information are stored securely and never shared without your consent.'
      }
    ]
  },
  {
    category: 'AI Features',
    questions: [
      {
        question: 'How accurate is the AI feedback?',
        answer: 'Our AI system has been trained on millions of successful interviews and provides highly accurate feedback. However, we recommend using it as a tool for improvement rather than the sole source of feedback.'
      },
      {
        question: 'Can the AI understand different accents and languages?',
        answer: 'Yes, our AI is trained to understand various accents and currently supports multiple languages. We continuously improve our language processing capabilities.'
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = faqs.filter(category => 
    selectedCategory === 'All' || category.category === selectedCategory
  ).map(category => ({
    ...category,
    questions: category.questions.filter(qa =>
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" paragraph>
            Find answers to common questions about InterviewAI
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: 600,
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label="All"
            onClick={() => setSelectedCategory('All')}
            color={selectedCategory === 'All' ? 'primary' : 'default'}
            sx={{ m: 0.5 }}
          />
          {faqCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>
      </Container>

      {/* FAQ Accordions */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {filteredFaqs.map((category) => (
          <Box key={category.category} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              {category.category}
            </Typography>
            {category.questions.map((qa, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <QuestionIcon
                      fontSize="small"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />
                    {qa.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{qa.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Container>

      {/* Support Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Still Have Questions?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            We're here to help you
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <SupportIcon fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Contact Support
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our support team is available 24/7 to help you with any questions
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href="/support"
                    startIcon={<SupportIcon />}
                  >
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <MailIcon fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Email Us
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Send us an email and we'll get back to you within 24 hours
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href="mailto:support@interviewai.com"
                    startIcon={<MailIcon />}
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default FAQ; 