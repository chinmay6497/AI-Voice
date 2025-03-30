import authApi from '../authApi';

describe('AuthApi', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    it('successfully logs in user with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await authApi.login(credentials);

      expect(response).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      });
      expect(localStorage.getItem('token')).toBe('mock-token');
    });

    it('throws error with invalid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(authApi.login(credentials)).rejects.toThrow('Invalid credentials');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('getProfile', () => {
    it('successfully gets user profile with valid token', async () => {
      localStorage.setItem('token', 'mock-token');

      const response = await authApi.getProfile();

      expect(response).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      });
    });

    it('throws error without token', async () => {
      await expect(authApi.getProfile()).rejects.toThrow('Unauthorized');
    });
  });

  describe('logout', () => {
    it('successfully logs out user', async () => {
      localStorage.setItem('token', 'mock-token');

      await authApi.logout();

      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('register', () => {
    it('successfully registers new user', async () => {
      const userData = {
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      };

      const response = await authApi.register(userData);

      expect(response).toEqual({
        id: 1,
        email: 'new@example.com',
        name: 'New User',
        role: 'user',
      });
      expect(localStorage.getItem('token')).toBe('mock-token');
    });
  });

  describe('updateProfile', () => {
    it('successfully updates user profile', async () => {
      localStorage.setItem('token', 'mock-token');

      const profileData = {
        name: 'Updated Name',
      };

      const response = await authApi.updateProfile(profileData);

      expect(response).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Updated Name',
        role: 'user',
      });
    });
  });

  describe('changePassword', () => {
    it('successfully changes password', async () => {
      localStorage.setItem('token', 'mock-token');

      const passwordData = {
        currentPassword: 'password123',
        newPassword: 'newpassword123',
      };

      const response = await authApi.changePassword(passwordData);

      expect(response).toEqual({
        message: 'Password updated successfully',
      });
    });
  });

  describe('forgotPassword', () => {
    it('successfully sends password reset email', async () => {
      const email = 'test@example.com';

      const response = await authApi.forgotPassword(email);

      expect(response).toEqual({
        message: 'Password reset email sent',
      });
    });
  });

  describe('resetPassword', () => {
    it('successfully resets password', async () => {
      const token = 'reset-token';
      const password = 'newpassword123';

      const response = await authApi.resetPassword(token, password);

      expect(response).toEqual({
        message: 'Password reset successful',
      });
    });
  });

  describe('verifyEmail', () => {
    it('successfully verifies email', async () => {
      const token = 'verification-token';

      const response = await authApi.verifyEmail(token);

      expect(response).toEqual({
        message: 'Email verified successfully',
      });
    });
  });

  describe('resendVerificationEmail', () => {
    it('successfully resends verification email', async () => {
      localStorage.setItem('token', 'mock-token');

      const response = await authApi.resendVerificationEmail();

      expect(response).toEqual({
        message: 'Verification email sent',
      });
    });
  });
}); 