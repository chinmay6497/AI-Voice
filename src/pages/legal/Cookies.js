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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const cookieTypes = [
  {
    category: 'Essential',
    purpose: 'These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take such as logging in or filling in forms.',
    examples: ['Authentication', 'Security', 'Load Balancing']
  },
  {
    category: 'Analytics',
    purpose: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    examples: ['Google Analytics', 'Usage Patterns', 'Performance Metrics']
  },
  {
    category: 'Functional',
    purpose: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
    examples: ['Language Preferences', 'User Settings', 'Live Chat Services']
  },
  {
    category: 'Targeting',
    purpose: 'These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads on other sites.',
    examples: ['Marketing Cookies', 'Social Media Tracking', 'Ad Performance']
  }
];

const Cookies = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Cookie Policy
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
            This Cookie Policy explains how InterviewAI uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            What are cookies?
          </Typography>
          <Typography variant="body1" paragraph>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or work more efficiently, as well as to provide reporting information.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Why do we use cookies?
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies for several reasons. Some cookies are required for technical reasons necessary for our platform to operate, while others enable us to track and target the interests of our users to enhance their experience on our platform.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Types of Cookies We Use
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle1" fontWeight="bold">Category</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" fontWeight="bold">Purpose</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" fontWeight="bold">Examples</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cookieTypes.map((type) => (
                  <TableRow key={type.category}>
                    <TableCell>{type.category}</TableCell>
                    <TableCell>{type.purpose}</TableCell>
                    <TableCell>{type.examples.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            How can you control cookies?
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Browser Settings"
                secondary="You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality may be restricted."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Third-Party Tools"
                secondary="You can also control tracking cookies through various privacy enhancement tools available in most modern browsers."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Our Settings"
                secondary="Where available, we provide cookie preference settings directly on our platform."
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Updates to this policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Third-Party Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform, deliver advertisements on and through the platform, and so on.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions or concerns about our use of cookies and other tracking technologies, please contact us at:
          </Typography>
          <Typography variant="body1">
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

export default Cookies; 