import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Mock data
const mockUsers = [
  {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
  },
];

const mockTopics = [
  {
    id: 1,
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript',
    difficulty: 'beginner',
  },
];

const mockInterviews = [
  {
    id: 1,
    topicId: 1,
    status: 'completed',
    score: 85,
    feedback: 'Great performance!',
  },
];

// Define handlers
const handlers = [
  // Auth handlers
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    const user = mockUsers.find(u => u.email === email);
    
    if (!user || password !== 'password123') {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid credentials' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token',
        user,
      })
    );
  }),

  rest.get('/api/auth/profile', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Unauthorized' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json(mockUsers[0])
    );
  }),

  // Interview handlers
  rest.get('/api/interviews/topics', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockTopics)
    );
  }),

  rest.post('/api/interviews/start', (req, res, ctx) => {
    const { topicId } = req.body;
    const topic = mockTopics.find(t => t.id === topicId);

    if (!topic) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Topic not found' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: Date.now(),
        topicId,
        status: 'in_progress',
      })
    );
  }),

  // Learning handlers
  rest.get('/api/learning/progress', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        completedModules: 5,
        totalModules: 10,
        achievements: [
          {
            id: 1,
            title: 'First Steps',
            description: 'Complete your first module',
            unlocked: true,
          },
        ],
      })
    );
  }),

  // Error handlers
  rest.get('/api/error', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'Internal server error' })
    );
  }),
];

// Create and export the server
export const server = setupServer(...handlers); 