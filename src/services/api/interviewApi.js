import BaseApi from './baseApi';

class InterviewApi extends BaseApi {
  constructor() {
    super(process.env.REACT_APP_API_URL || 'http://localhost:3001/api');
  }

  // Interview topics and setup
  async getTopics() {
    const response = await this.get('/interviews/topics');
    return response.data;
  }

  async getTopicDetails(topicId) {
    const response = await this.get(`/interviews/topics/${topicId}`);
    return response.data;
  }

  async getAIInterviewers() {
    const response = await this.get('/interviews/ai-interviewers');
    return response.data;
  }

  // Interview session management
  async startInterview(topicId) {
    const response = await this.post('/interviews/start', { topicId });
    return response.data;
  }

  async submitAnswer(interviewId, answer) {
    const response = await this.post(`/interviews/${interviewId}/answer`, { answer });
    return response.data;
  }

  async getFeedback(interviewId) {
    const response = await this.get(`/interviews/${interviewId}/feedback`);
    return response.data;
  }

  async endInterview(interviewId) {
    const response = await this.post(`/interviews/${interviewId}/end`);
    return response.data;
  }

  // Interview scheduling
  async scheduleInterview(interviewData) {
    const response = await this.post('/interviews/schedule', interviewData);
    return response.data;
  }

  async getScheduledInterviews() {
    const response = await this.get('/interviews/scheduled');
    return response.data;
  }

  async cancelScheduledInterview(interviewId) {
    const response = await this.delete(`/interviews/scheduled/${interviewId}`);
    return response.data;
  }

  // Interview history and analytics
  async getHistory() {
    const response = await this.get('/interviews/history');
    return response.data;
  }

  async getInterviewDetails(interviewId) {
    const response = await this.get(`/interviews/${interviewId}`);
    return response.data;
  }

  async getAnalytics() {
    const response = await this.get('/interviews/analytics');
    return response.data;
  }

  // Feedback and ratings
  async submitFeedback(interviewId, feedback) {
    const response = await this.post(`/interviews/${interviewId}/feedback`, { feedback });
    return response.data;
  }

  async rateInterview(interviewId, rating) {
    const response = await this.post(`/interviews/${interviewId}/rate`, { rating });
    return response.data;
  }

  // Real-time interview features
  connectInterviewWebSocket(interviewId, callbacks) {
    const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:3001'}/interviews/${interviewId}`;
    return this.connectWebSocket(wsUrl, callbacks);
  }

  // Recording and playback
  async startRecording(interviewId) {
    const response = await this.post(`/interviews/${interviewId}/recording/start`);
    return response.data;
  }

  async stopRecording(interviewId) {
    const response = await this.post(`/interviews/${interviewId}/recording/stop`);
    return response.data;
  }

  async getRecording(interviewId) {
    const response = await this.get(`/interviews/${interviewId}/recording`);
    return response.data;
  }

  // Practice questions
  async getPracticeQuestions(topicId) {
    const response = await this.get(`/interviews/topics/${topicId}/practice`);
    return response.data;
  }

  async submitPracticeAnswer(questionId, answer) {
    const response = await this.post(`/interviews/practice/${questionId}/answer`, { answer });
    return response.data;
  }
}

export default new InterviewApi(); 