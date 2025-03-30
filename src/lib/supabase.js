import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swdtjnvggdvmkmojtbbw.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey?.substring(0, 10) + '...');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

if (!supabaseUrl.startsWith('https://')) {
  throw new Error('Invalid Supabase URL format. URL must start with https://');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for auth
export const signUpWithSupabase = async (userData) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        name: userData.name,
      },
    },
  });
  
  if (error) throw error;
  return data;
};

export const signInWithSupabase = async (credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  
  if (error) throw error;
  return data;
};

export const signOutFromSupabase = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user;
};

// Helper functions for profile operations
export const updateUserProfile = async (profileData) => {
  const { data: user } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      role: profileData.role,
      resume_url: profileData.resume_url,
      resume_text: profileData.resume_text
    })
    .select();

  if (error) throw error;
  return data;
};

export const getUserProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

// Helper functions for database operations
export const db = {
  // Profiles
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  },

  // Interviews
  createInterview: async (userId, interviewData) => {
    const { data, error } = await supabase
      .from('interviews')
      .insert([{ user_id: userId, ...interviewData }]);
    
    if (error) throw error;
    return data;
  },

  getInterviews: async (userId) => {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Learning Progress
  updateProgress: async (userId, topicId, progress) => {
    const { data, error } = await supabase
      .from('learning_progress')
      .upsert({
        user_id: userId,
        topic_id: topicId,
        progress,
        updated_at: new Date().toISOString(),
      });
    
    if (error) throw error;
    return data;
  },

  getLearningProgress: async (userId) => {
    const { data, error } = await supabase
      .from('learning_progress')
      .select(`
        *,
        topics:topic_id (
          name,
          category
        )
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },
}; 