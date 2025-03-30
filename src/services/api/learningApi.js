import BaseApi from './baseApi';

class LearningApi extends BaseApi {
  constructor() {
    super(process.env.REACT_APP_API_URL || 'http://localhost:3001/api');
  }

  // Learning topics and content
  async getTopics() {
    const response = await this.get('/learning/topics');
    return response.data;
  }

  async getTopicDetails(topicId) {
    const response = await this.get(`/learning/topics/${topicId}`);
    return response.data;
  }

  async getModules(topicId) {
    const response = await this.get(`/learning/topics/${topicId}/modules`);
    return response.data;
  }

  async getModuleContent(topicId, moduleId) {
    const response = await this.get(`/learning/topics/${topicId}/modules/${moduleId}`);
    return response.data;
  }

  // Learning session management
  async startSession(topicId) {
    const response = await this.post('/learning/sessions/start', { topicId });
    return response.data;
  }

  async endSession(sessionId) {
    const response = await this.post(`/learning/sessions/${sessionId}/end`);
    return response.data;
  }

  async getSessionHistory() {
    const response = await this.get('/learning/sessions/history');
    return response.data;
  }

  // Progress tracking
  async getProgress() {
    const response = await this.get('/learning/progress');
    return response.data;
  }

  async updateProgress(topicId, progress) {
    const response = await this.put(`/learning/topics/${topicId}/progress`, { progress });
    return response.data;
  }

  async completeModule(topicId, moduleId) {
    const response = await this.post(`/learning/topics/${topicId}/modules/${moduleId}/complete`);
    return response.data;
  }

  // Achievements and rewards
  async getAchievements() {
    const response = await this.get('/learning/achievements');
    return response.data;
  }

  async unlockAchievement(achievementId) {
    const response = await this.post(`/learning/achievements/${achievementId}/unlock`);
    return response.data;
  }

  async getRewards() {
    const response = await this.get('/learning/rewards');
    return response.data;
  }

  // Learning preferences
  async getPreferences() {
    const response = await this.get('/learning/preferences');
    return response.data;
  }

  async updatePreferences(preferences) {
    const response = await this.put('/learning/preferences', preferences);
    return response.data;
  }

  // Interactive learning features
  async submitQuizAnswer(quizId, answer) {
    const response = await this.post(`/learning/quizzes/${quizId}/answer`, { answer });
    return response.data;
  }

  async getQuizResults(quizId) {
    const response = await this.get(`/learning/quizzes/${quizId}/results`);
    return response.data;
  }

  // Real-time learning features
  connectLearningWebSocket(sessionId, callbacks) {
    const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:3001'}/learning/sessions/${sessionId}`;
    return this.connectWebSocket(wsUrl, callbacks);
  }

  // Learning resources
  async getResources(topicId) {
    const response = await this.get(`/learning/topics/${topicId}/resources`);
    return response.data;
  }

  async getRecommendedContent() {
    const response = await this.get('/learning/recommendations');
    return response.data;
  }

  // Learning analytics
  async getAnalytics() {
    const response = await this.get('/learning/analytics');
    return response.data;
  }

  async getTopicAnalytics(topicId) {
    const response = await this.get(`/learning/topics/${topicId}/analytics`);
    return response.data;
  }

  // Learning community features
  async getDiscussionTopics(topicId) {
    const response = await this.get(`/learning/topics/${topicId}/discussions`);
    return response.data;
  }

  async createDiscussion(topicId, discussion) {
    const response = await this.post(`/learning/topics/${topicId}/discussions`, discussion);
    return response.data;
  }

  async getDiscussionReplies(discussionId) {
    const response = await this.get(`/learning/discussions/${discussionId}/replies`);
    return response.data;
  }

  async addDiscussionReply(discussionId, reply) {
    const response = await this.post(`/learning/discussions/${discussionId}/replies`, reply);
    return response.data;
  }
}

export default new LearningApi(); 