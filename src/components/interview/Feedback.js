import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
} from '@mui/material';

const Feedback = ({ feedback, notes }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Interview Feedback
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Overall Performance"
              secondary={
                <Rating value={feedback.rating} readOnly precision={0.5} />
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Strengths"
              secondary={
                <List>
                  {feedback.strengths.map((strength, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={strength} />
                    </ListItem>
                  ))}
                </List>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Areas for Improvement"
              secondary={
                <List>
                  {feedback.improvements.map((improvement, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={improvement} />
                    </ListItem>
                  ))}
                </List>
              }
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Points & Notes
        </Typography>
        <List>
          {notes.map((note, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={note} />
              </ListItem>
              {index < notes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Feedback; 