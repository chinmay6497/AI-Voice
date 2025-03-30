import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Link
} from '@mui/material';
import {
  Download as DownloadIcon,
  Article as ArticleIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const pressReleases = [
  {
    date: 'March 15, 2024',
    title: 'InterviewAI Raises $30M Series A to Transform Interview Preparation',
    source: 'TechCrunch',
    link: 'https://techcrunch.com/interviewai-series-a'
  },
  {
    date: 'February 1, 2024',
    title: 'InterviewAI Launches Revolutionary AI-Powered Mock Interview Platform',
    source: 'VentureBeat',
    link: 'https://venturebeat.com/interviewai-launch'
  },
  {
    date: 'January 10, 2024',
    title: 'How AI is Transforming Job Interview Preparation',
    source: 'Forbes',
    link: 'https://forbes.com/interviewai-feature'
  }
];

const mediaKit = {
  brandAssets: [
    { name: 'Logo Package (All Formats)', size: '25MB' },
    { name: 'Brand Guidelines', size: '5MB' },
    { name: 'Product Screenshots', size: '50MB' }
  ],
  factSheet: {
    founded: '2024',
    headquarters: 'San Francisco, CA',
    employees: '50+',
    funding: '$30M Series A',
    investors: 'Leading Silicon Valley VCs',
    users: '50,000+'
  }
};

const Press = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Press & Media
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mb: 4 }}>
            Get the latest news and updates about InterviewAI's mission to revolutionize interview preparation.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DownloadIcon />}
              href="#media-kit"
            >
              Download Media Kit
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<EmailIcon />}
              href="mailto:press@interviewai.com"
            >
              Press Inquiries
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Latest News Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" gutterBottom>
          Latest News
        </Typography>
        <Grid container spacing={4}>
          {pressReleases.map((release, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {release.date}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {release.title}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Featured in {release.source}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    endIcon={<ArticleIcon />}
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 2 }}
                  >
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Media Kit Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }} id="media-kit">
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Media Kit
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Brand Assets
              </Typography>
              <Stack spacing={2}>
                {mediaKit.brandAssets.map((asset, index) => (
                  <Card key={index}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6">{asset.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Size: {asset.size}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        href={`/downloads/${asset.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Company Fact Sheet
              </Typography>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    {Object.entries(mediaKit.factSheet).map(([key, value]) => (
                      <Box key={key}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                        <Typography variant="h6">{value}</Typography>
                        <Divider sx={{ mt: 1 }} />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Media Contact
        </Typography>
        <Typography variant="body1" paragraph>
          For press inquiries, please contact our media relations team:
        </Typography>
        <Typography variant="h6" color="primary">
          <Link href="mailto:press@interviewai.com">
            press@interviewai.com
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Press; 