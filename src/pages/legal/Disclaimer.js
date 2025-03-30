import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const Disclaimer = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Disclaimer
          </Typography>
          <Typography variant="h6">
            Last updated: March 20, 2024
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            Please read this disclaimer carefully before using the InterviewAI platform. By accessing or using our services, you acknowledge and agree to this disclaimer.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. No Guarantee of Outcomes
          </Typography>
          <Typography variant="body1" paragraph>
            While InterviewAI strives to provide high-quality interview preparation services, we cannot and do not guarantee specific outcomes, including but not limited to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Job Offers"
                secondary="Success in actual job interviews or receiving job offers"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Interview Performance"
                secondary="Specific performance levels in real interviews"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Career Advancement"
                secondary="Career progression or salary increases"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. AI Technology Limitations
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform uses artificial intelligence technology, which has inherent limitations:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Accuracy"
                secondary="While our AI strives for accuracy, it may not always provide perfect or complete feedback"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Personalization"
                secondary="AI responses are based on patterns and training data, and may not account for all individual circumstances"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Technical Issues"
                secondary="The service may experience technical difficulties or interruptions"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Not Professional Advice
          </Typography>
          <Typography variant="body1" paragraph>
            The content and feedback provided through our platform:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="General Information"
                secondary="Is for general informational and practice purposes only"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Not Professional Services"
                secondary="Does not constitute professional career counseling, legal advice, or professional services"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Independent Verification"
                secondary="Should be independently verified with appropriate professionals"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Third-Party Content
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform may include references to third-party content, websites, or services. We are not responsible for:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="External Content"
                secondary="The accuracy, reliability, or completeness of third-party content"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="External Services"
                secondary="The availability or functionality of linked third-party services"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            To the maximum extent permitted by law, InterviewAI and its affiliates shall not be liable for:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Direct Damages"
                secondary="Any direct damages arising from your use of our services"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Indirect Damages"
                secondary="Any indirect, incidental, special, or consequential damages"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Lost Opportunities"
                secondary="Lost profits, opportunities, or career advancement"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Changes to Disclaimer
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to our platform. Your continued use of our services constitutes acceptance of any modifications.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this disclaimer, please contact us at:
          </Typography>
          <Typography variant="body1">
            Email: legal@interviewai.com
          </Typography>
          <Typography variant="body1">
            Address: 123 Tech Street, San Francisco, CA 94105
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              By using InterviewAI, you acknowledge that you have read, understood, and agree to this disclaimer.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Disclaimer; 