-- Create interview_questions table
CREATE TABLE interview_questions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    hints TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create interview_recordings table
CREATE TABLE interview_recordings (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    recording_url TEXT NOT NULL,
    feedback TEXT,
    score INTEGER,
    strengths TEXT[],
    improvements TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create storage bucket for recordings
INSERT INTO storage.buckets (id, name, public) 
VALUES ('recordings', 'recordings', true);

-- Insert sample interview questions
INSERT INTO interview_questions (type, question, hints) VALUES
-- Behavioral Questions
('behavioral', 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?', 
ARRAY['Focus on your communication approach', 'Describe the specific actions you took', 'Share the outcome and what you learned']),
('behavioral', 'Describe a project you are most proud of and why.', 
ARRAY['Explain your role in the project', 'Highlight specific challenges you overcame', 'Share measurable results']),
('behavioral', 'How do you handle tight deadlines and pressure?', 
ARRAY['Provide a specific example', 'Explain your time management approach', 'Share how you maintain quality under pressure']),

-- Technical Questions
('technical', 'Write a function to find the longest palindrome in a string.', 
ARRAY['Consider edge cases', 'Think about time complexity', 'Consider space complexity']),
('technical', 'Explain how you would design a scalable web application.', 
ARRAY['Consider load balancing', 'Think about database scaling', 'Discuss caching strategies']),
('technical', 'How would you implement a rate limiter?', 
ARRAY['Consider different algorithms', 'Think about distributed systems', 'Discuss trade-offs']),

-- Full Interview Questions
('full', 'Walk me through your experience and why you are interested in this role.', 
ARRAY['Focus on relevant experience', 'Highlight key achievements', 'Connect to the role requirements']),
('full', 'What are your greatest strengths and areas for improvement?', 
ARRAY['Provide specific examples', 'Be honest about weaknesses', 'Show self-awareness']),
('full', 'Where do you see yourself in 5 years?', 
ARRAY['Align with company goals', 'Show ambition', 'Demonstrate realistic planning']);

-- Create RLS policies
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_recordings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read interview questions
CREATE POLICY "Allow authenticated users to read interview questions"
ON interview_questions FOR SELECT
TO authenticated
USING (true);

-- Allow users to read their own recordings
CREATE POLICY "Users can read their own recordings"
ON interview_recordings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own recordings
CREATE POLICY "Users can insert their own recordings"
ON interview_recordings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own recordings
CREATE POLICY "Users can update their own recordings"
ON interview_recordings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own recordings
CREATE POLICY "Users can delete their own recordings"
ON interview_recordings FOR DELETE
TO authenticated
USING (auth.uid() = user_id); 