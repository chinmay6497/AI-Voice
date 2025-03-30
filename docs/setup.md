# Setup Instructions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- Supabase account
- OpenAI API key (for AI features)

## Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interview-prep-platform.git
cd interview-prep-platform
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../web
npm install
```

3. Create environment files:

Backend (.env):
```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

1. Create Supabase project:
   - Go to [Supabase](https://supabase.com)
   - Create new project
   - Get project URL and keys

2. Create database tables:
```sql
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create interview_topics table
create table interview_topics (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  difficulty text not null,
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create interviews table
create table interviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  topic_id uuid references interview_topics(id) on delete cascade,
  status text not null,
  score integer,
  feedback text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create learning_topics table
create table learning_topics (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  difficulty text not null,
  category text not null,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create learning_progress table
create table learning_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  topic_id uuid references learning_topics(id) on delete cascade,
  status text not null,
  completed_modules jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table profiles enable row level security;
alter table interviews enable row level security;
alter table learning_progress enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Interviews policies
create policy "Users can view their own interviews"
  on interviews for select
  using ( auth.uid() = user_id );

create policy "Users can create their own interviews"
  on interviews for insert
  with check ( auth.uid() = user_id );

-- Learning progress policies
create policy "Users can view their own learning progress"
  on learning_progress for select
  using ( auth.uid() = user_id );

create policy "Users can update their own learning progress"
  on learning_progress for update
  using ( auth.uid() = user_id );
```

## Development Setup

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd web
npm start
```

3. Run tests:
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd web
npm test
```

## Production Deployment

1. Build the frontend:
```bash
cd web
npm run build
```

2. Deploy the backend:
```bash
cd backend
npm run build
npm start
```

3. Configure environment variables in production:
   - Set up environment variables in your hosting platform
   - Configure CORS settings
   - Set up SSL certificates

## CI/CD Setup

1. Create GitHub Actions workflow:
```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm ci
      - run: npm run build
      # Add deployment steps for your hosting platform
```

## Monitoring Setup

1. Set up error tracking:
   - Configure Sentry
   - Set up error boundaries
   - Implement logging

2. Set up performance monitoring:
   - Configure performance metrics
   - Set up alerts
   - Monitor API usage

3. Set up analytics:
   - Configure user analytics
   - Track feature usage
   - Monitor user engagement

## Security Setup

1. Configure authentication:
   - Set up JWT
   - Configure session management
   - Implement rate limiting

2. Set up authorization:
   - Configure RLS policies
   - Set up role-based access
   - Implement API security

3. Configure data security:
   - Set up encryption
   - Configure backup
   - Implement data retention

## Maintenance

1. Regular updates:
   - Update dependencies
   - Apply security patches
   - Monitor performance

2. Database maintenance:
   - Regular backups
   - Index optimization
   - Query optimization

3. Monitoring:
   - Check error logs
   - Monitor performance
   - Track usage metrics 