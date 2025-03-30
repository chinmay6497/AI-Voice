import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link
} from '@mui/material';

const Terms = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Terms of Service
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
            Please read these Terms of Service ("Terms") carefully before using the InterviewAI platform. By accessing or using our services, you agree to be bound by these Terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using InterviewAI, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. Service Description
          </Typography>
          <Typography variant="body1" paragraph>
            InterviewAI provides an AI-powered interview preparation platform that includes mock interviews, feedback, and learning resources. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. User Accounts
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Registration"
                secondary="You must register for an account to access our services. You agree to provide accurate and complete information during registration."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Security"
                secondary="You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Restrictions"
                secondary="You must be at least 18 years old to create an account. One person may not maintain multiple accounts."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. User Conduct
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Violate Laws"
                secondary="Use our services for any unlawful purpose or in violation of any applicable laws."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Harmful Content"
                secondary="Upload or transmit viruses, malware, or other harmful computer code."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Unauthorized Access"
                secondary="Attempt to gain unauthorized access to our systems or other users' accounts."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content and materials available on InterviewAI, including but not limited to text, graphics, logos, and software, are the property of InterviewAI or its licensors and are protected by intellectual property laws.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Payment Terms
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Subscription Fees"
                secondary="You agree to pay all fees associated with your subscription plan. Fees are non-refundable except as required by law."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Billing"
                secondary="We will bill you through the payment method you provide. You authorize us to charge your payment method for all fees."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            7. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            InterviewAI is provided "as is" without any warranties. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            8. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We may terminate or suspend your account and access to our services at any time, without prior notice, for any reason, including violation of these Terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            9. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our platform. Your continued use of our services after such changes constitutes acceptance of the modified Terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            10. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography variant="body1">
            Email: legal@interviewai.com
          </Typography>
          <Typography variant="body1">
            Address: 123 Tech Street, San Francisco, CA 94105
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              By using InterviewAI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our{' '}
              <Link href="/legal/privacy" color="primary">
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Terms; 