import BaseApi from './baseApi';

class AuthApi extends BaseApi {
  constructor() {
    super(process.env.REACT_APP_API_URL || 'http://localhost:3001/api');
  }

  // Authentication methods
  async login(credentials) {
    const response = await this.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  }

  async register(userData) {
    const response = await this.post('/auth/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  }

  async logout() {
    await this.post('/auth/logout');
    localStorage.removeItem('token');
  }

  async getProfile() {
    const response = await this.get('/auth/profile');
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await this.put('/auth/profile', profileData);
    return response.data;
  }

  async changePassword(passwordData) {
    const response = await this.put('/auth/change-password', passwordData);
    return response.data;
  }

  async forgotPassword(email) {
    const response = await this.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token, password) {
    const response = await this.post('/auth/reset-password', { token, password });
    return response.data;
  }

  async verifyEmail(token) {
    const response = await this.post('/auth/verify-email', { token });
    return response.data;
  }

  async resendVerificationEmail() {
    const response = await this.post('/auth/resend-verification');
    return response.data;
  }

  // OAuth methods
  async loginWithGoogle() {
    const response = await this.get('/auth/google');
    return response.data;
  }

  async loginWithGithub() {
    const response = await this.get('/auth/github');
    return response.data;
  }

  async handleOAuthCallback(provider, code) {
    const response = await this.post(`/auth/${provider}/callback`, { code });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  }
}

export default new AuthApi(); 