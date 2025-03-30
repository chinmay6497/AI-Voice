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

const Privacy = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Privacy Policy
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
            At InterviewAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our interview preparation platform.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Information We Collect
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Personal Information"
                secondary="Name, email address, and professional information you provide during registration and profile creation."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Usage Data"
                secondary="Information about how you use our platform, including interview recordings, responses, and feedback."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Technical Data"
                secondary="IP address, browser type, device information, and cookies for platform functionality and improvement."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Service Provision"
                secondary="To provide and maintain our interview preparation services, including personalized feedback and recommendations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Platform Improvement"
                secondary="To analyze usage patterns and improve our AI algorithms and user experience."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Communication"
                secondary="To send you updates, newsletters, and important information about our services."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Data Sharing and Disclosure
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Service Providers"
                secondary="We may share your information with trusted third-party service providers who assist us in operating our platform."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Legal Requirements"
                secondary="We may disclose your information if required by law or in response to valid requests from public authorities."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Your Rights
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Access"
                secondary="You can request access to your personal information at any time."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Correction"
                secondary="You can request correction of your personal information if it is inaccurate."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Deletion"
                secondary="You can request deletion of your personal information, subject to legal requirements."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Cookies and Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar tracking technologies to improve your experience on our platform. You can control cookie settings through your browser preferences.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            7. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            8. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Email: privacy@interviewai.com
          </Typography>
          <Typography variant="body1">
            Address: 123 Tech Street, San Francisco, CA 94105
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Privacy; 