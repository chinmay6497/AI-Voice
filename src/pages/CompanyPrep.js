import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  TextField,
  Chip,
  Rating,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import {
  Search as SearchIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingIcon,
  Work as WorkIcon
} from '@mui/icons-material';

const companies = [
  {
    name: 'Google',
    logo: '/images/companies/google.png',
    rating: 4.5,
    topics: ['Algorithms', 'System Design', 'Behavioral'],
    difficulty: 'Hard',
    positions: ['Software Engineer', 'Product Manager', 'Data Scientist']
  },
  {
    name: 'Microsoft',
    logo: '/images/companies/microsoft.png',
    rating: 4.2,
    topics: ['Data Structures', 'System Design', 'Problem Solving'],
    difficulty: 'Medium',
    positions: ['Software Engineer', 'Program Manager', 'Cloud Engineer']
  },
  {
    name: 'Amazon',
    logo: '/images/companies/amazon.png',
    rating: 4.0,
    topics: ['Leadership Principles', 'System Design', 'Coding'],
    difficulty: 'Hard',
    positions: ['SDE', 'Technical Program Manager', 'Solutions Architect']
  },
  {
    name: 'Meta',
    logo: '/images/companies/meta.png',
    rating: 4.3,
    topics: ['Algorithms', 'Product Sense', 'System Design'],
    difficulty: 'Hard',
    positions: ['Software Engineer', 'Product Manager', 'Research Scientist']
  }
];

const CompanyPrep = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSelectedPosition(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Company-Specific Preparation
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Targeted interview preparation resources for top tech companies
      </Typography>

      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={companies}
              getOptionLabel={(option) => option.name}
              value={selectedCompany}
              onChange={(event, newValue) => handleCompanySelect(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Search Company"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>
          {selectedCompany && (
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={selectedCompany.positions}
                value={selectedPosition}
                onChange={(event, newValue) => setSelectedPosition(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Select Position"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Companies Grid */}
      <Grid container spacing={3}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={3} key={company.name}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
              onClick={() => handleCompanySelect(company)}
            >
              <CardMedia
                component="img"
                height="140"
                image={company.logo}
                alt={company.name}
                sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {company.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={company.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({company.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Difficulty: {company.difficulty}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {company.topics.map((topic) => (
                    <Chip key={topic} label={topic} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Selected Company Details */}
      {selectedCompany && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            {selectedCompany.name} Interview Preparation
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Interview Process
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Online Assessment
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Technical Phone Screen
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • On-site Interviews (4-5 rounds)
                  </Typography>
                  <Typography variant="body1">
                    • Team Matching & Offer
                  </Typography>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Key Focus Areas
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedCompany.topics.map((topic) => (
                        <Grid item xs={12} sm={6} key={topic}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" gutterBottom>
                                {topic}
                              </Typography>
                              <Button variant="text" color="primary">
                                View Resources
                              </Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Stats
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WorkIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      {selectedCompany.positions.length} Open Positions
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      {selectedCompany.difficulty} Interview Difficulty
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BusinessIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      4-6 Weeks Process
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default CompanyPrep; 