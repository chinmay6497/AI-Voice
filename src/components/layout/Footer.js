import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#1976d2', color: 'white', pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Ready to transform your interview preparation?
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Start your free trial today.
          </Typography>
          <Button
            component={RouterLink}
            to="/signup"
            variant="contained"
            sx={{
              bgcolor: '#9c27b0',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#7b1fa2',
              },
            }}
          >
            Get started
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Company Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/company/about" color="inherit">About Us</Link>
              <Link component={RouterLink} to="/company/mission" color="inherit">Our Mission</Link>
              <Link component={RouterLink} to="/company/team" color="inherit">Our Team</Link>
              <Link component={RouterLink} to="/company/careers" color="inherit">Careers</Link>
              <Link component={RouterLink} to="/company/press" color="inherit">Press</Link>
            </Stack>
          </Grid>

          {/* Services Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Services
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/app/mock-interview" color="inherit">AI Mock Interview</Link>
              <Link component={RouterLink} to="/services/feedback" color="inherit">Interview Feedback</Link>
              <Link component={RouterLink} to="/app/company-prep" color="inherit">Company Preparation</Link>
              <Link component={RouterLink} to="/app/coding-prep" color="inherit">Coding Practice</Link>
            </Stack>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/app/learning" color="inherit">Learning Center</Link>
              <Link component={RouterLink} to="/resources/blog" color="inherit">Blog</Link>
              <Link component={RouterLink} to="/resources/guides" color="inherit">Guides</Link>
              <Link component={RouterLink} to="/resources/faq" color="inherit">FAQ</Link>
            </Stack>
          </Grid>

          {/* Support Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/support" color="inherit">Help Center</Link>
              <Link component={RouterLink} to="/support/contact" color="inherit">Contact Us</Link>
              <Link component={RouterLink} to="/legal/privacy" color="inherit">Privacy Policy</Link>
              <Link component={RouterLink} to="/legal/terms" color="inherit">Terms of Service</Link>
              <Link component={RouterLink} to="/legal/cookies" color="inherit">Cookie Policy</Link>
              <Link component={RouterLink} to="/legal/disclaimer" color="inherit">Disclaimer</Link>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" color="inherit">
                © {new Date().getFullYear()} InterviewAI. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2}>
                <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#" target="_blank">
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter" component="a" href="#" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Facebook" component="a" href="#" target="_blank">
                  <FacebookIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 