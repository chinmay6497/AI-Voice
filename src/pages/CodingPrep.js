import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  CardActions,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import {
  Code as CodeIcon,
  Timer as TimerIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Save as SaveIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  CheckCircle as CheckCircleIcon,
  BugReport as BugIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '@monaco-editor/react';
import AIVoice from '../components/ai/AIVoice';

const mockProblems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 104',
      '-109 <= nums[i] <= 109',
      '-109 <= target <= 109',
      'Only one valid answer exists.',
    ],
    starterCode: `function twoSum(nums, target) {
    // Your code here
};`,
    testCases: [
      {
        input: '[2,7,11,15], 9',
        expectedOutput: '[0,1]',
      },
      {
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    bookmarked: false,
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The brackets match.',
      },
    ],
    constraints: [
      '1 <= s.length <= 104',
      's consists of parentheses only \'()[]{}\'',
    ],
    starterCode: `function isValid(s) {
    // Your code here
};`,
    testCases: [
      {
        input: '"()"',
        expectedOutput: 'true',
      },
      {
        input: '"()[]{}"',
        expectedOutput: 'true',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    bookmarked: true,
  },
];

const categories = [
  'All',
  'Arrays',
  'Strings',
  'Linked Lists',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Sorting',
  'Searching',
  'Stacks',
  'Queues',
];

const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Dynamic Programming', 'Graphs'];
const languages = ['JavaScript', 'Python', 'Java', 'C++'];

const sampleProblem = {
  title: 'Two Sum',
  difficulty: 'Easy',
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    }
  ],
  constraints: [
    '2 <= nums.length <= 104',
    '-109 <= nums[i] <= 109',
    '-109 <= target <= 109',
    'Only one valid answer exists.'
  ],
  starterCode: {
    JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`,
    Python: `def twoSum(nums: List[int], target: int) -> List[int]:
    # Your code here
    pass`,
    Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
    'C++': `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`
  }
};

const CodingPrep = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState(sampleProblem.starterCode[languages[0]]);
  const [language, setLanguage] = useState(languages[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setTestResults(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      // Create a safe execution environment
      const safeEval = new Function(`
        try {
          ${code}
        } catch (error) {
          console.error(error);
        }
      `);

      // Capture console output
      const originalConsole = { ...console };
      let capturedOutput = '';
      console.log = (...args) => {
        capturedOutput += args.join(' ') + '\\n';
      };
      console.error = (...args) => {
        capturedOutput += 'Error: ' + args.join(' ') + '\\n';
      };

      // Execute the code
      safeEval();

      // Restore console
      console = originalConsole;

      setOutput(capturedOutput);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStopCode = () => {
    setIsRunning(false);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(sampleProblem.starterCode[event.target.value]);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleSaveCode = () => {
    // Save code implementation
    const savedCode = {
      problemId: selectedProblem?.id || 'practice',
      language,
      code,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, this would save to backend/localStorage
    console.log('Saving code:', savedCode);
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    // Simulate test execution
    setTimeout(() => {
      setTestResults({
        passed: 2,
        total: 2,
        results: [
          {
            input: selectedProblem.testCases[0].input,
            expectedOutput: selectedProblem.testCases[0].expectedOutput,
            actualOutput: '[0,1]',
            passed: true,
          },
          {
            input: selectedProblem.testCases[1].input,
            expectedOutput: selectedProblem.testCases[1].expectedOutput,
            actualOutput: '[1,2]',
            passed: true,
          },
        ],
      });
      setIsRunning(false);
    }, 1500);
  };

  const handleBookmark = (problemId) => {
    // In a real app, this would update the bookmark status in the backend
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredProblems = mockProblems.filter((problem) => {
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Coding Practice
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Solve coding challenges and improve your problem-solving skills
      </Typography>

      <Grid container spacing={3}>
        {/* Problem Description */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              {sampleProblem.title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={sampleProblem.difficulty} 
                color={
                  sampleProblem.difficulty === 'Easy' ? 'success' :
                  sampleProblem.difficulty === 'Medium' ? 'warning' : 'error'
                }
                size="small"
              />
            </Box>
            <Typography variant="body1" paragraph>
              {sampleProblem.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Examples:
            </Typography>
            {sampleProblem.examples.map((example, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  Input: {example.input}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  Output: {example.output}
                </Typography>
                {example.explanation && (
                  <Typography variant="body2" color="text.secondary">
                    Explanation: {example.explanation}
                  </Typography>
                )}
              </Box>
            ))}
            <Typography variant="h6" gutterBottom>
              Constraints:
            </Typography>
            <List dense>
              {sampleProblem.constraints.map((constraint, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <BugIcon color="action" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={constraint}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Code Editor */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={language}
                      label="Language"
                      onChange={handleLanguageChange}
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <IconButton 
                    color="primary"
                    onClick={handleRunCode}
                    disabled={isRunning}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton 
                    onClick={handleSaveCode}
                  >
                    <SaveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ height: '60vh' }}>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                language={language.toLowerCase()}
                value={code}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  automaticLayout: true,
                }}
              />
            </Box>
            {output && (
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Output:
                </Typography>
                <Typography 
                  variant="body2" 
                  component="pre"
                  sx={{ 
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    bgcolor: 'grey.100',
                    p: 1,
                    borderRadius: 1
                  }}
                >
                  {output}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Problem List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              More Problems
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Topic</InputLabel>
                  <Select
                    value={selectedTopic}
                    label="Topic"
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    <MenuItem value="">All Topics</MenuItem>
                    {topics.map((topic) => (
                      <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={selectedDifficulty}
                    label="Difficulty"
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <MenuItem value="">All Difficulties</MenuItem>
                    {difficulties.map((diff) => (
                      <MenuItem key={diff} value={diff}>{diff}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <List>
              {filteredProblems.map((problem) => (
                <React.Fragment key={problem.id}>
                  <ListItem 
                    button
                    selected={selectedProblem?.id === problem.id}
                    onClick={() => handleProblemSelect(problem)}
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <CodeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={problem.title}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={problem.difficulty}
                            size="small"
                            color={
                              problem.difficulty === 'Hard'
                                ? 'error'
                                : problem.difficulty === 'Medium'
                                ? 'warning'
                                : 'success'
                            }
                            sx={{ mr: 1 }}
                          />
                          <Chip label={problem.category} size="small" />
                        </Box>
                      }
                    />
                    <Chip 
                      icon={<CheckCircleIcon />}
                      label="Solved"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CodingPrep; 