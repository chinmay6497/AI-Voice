import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const AIVoice = ({ text, onEnd }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const speak = () => {
    if (!speechSynthesis) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={isSpeaking ? "Stop speaking" : "Start speaking"}>
        <IconButton
          onClick={isSpeaking ? stop : speak}
          color={isSpeaking ? "primary" : "default"}
          size="small"
        >
          {isSpeaking ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" color="text.secondary">
        {isSpeaking ? "Speaking..." : "Click to speak"}
      </Typography>
    </Box>
  );
};

export default AIVoice; 