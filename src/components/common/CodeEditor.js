import React from 'react';
import Editor from '@monaco-editor/react';
import { Box, Paper, Typography } from '@mui/material';

const CodeEditor = ({ value, onChange, language = 'javascript', readOnly = false, height = '400px' }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ height }}>
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={value}
          onChange={onChange}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          theme="vs-dark"
        />
      </Box>
    </Paper>
  );
};

export default CodeEditor; 