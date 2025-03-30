import supabase from './supabase';

class InterviewService {
  async getInterviewQuestions(type) {
    try {
      const { data, error } = await supabase
        .from('interview_questions')
        .select('*')
        .eq('type', type.toLowerCase())
        .order('id');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching interview questions:', error);
      throw error;
    }
  }

  async saveInterviewRecording(userId, interviewData) {
    try {
      const { data, error } = await supabase
        .from('interview_recordings')
        .insert([
          {
            user_id: userId,
            type: interviewData.type,
            recording_url: interviewData.recordingUrl,
            feedback: interviewData.feedback,
            score: interviewData.score,
            strengths: interviewData.strengths,
            improvements: interviewData.improvements,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error saving interview recording:', error);
      throw error;
    }
  }

  async getInterviewHistory(userId) {
    try {
      const { data, error } = await supabase
        .from('interview_recordings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching interview history:', error);
      throw error;
    }
  }

  async uploadRecording(file, userId) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = `interview-recordings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('recordings')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('recordings')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading recording:', error);
      throw error;
    }
  }
}

export const interviewService = new InterviewService(); 