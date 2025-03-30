import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  GoogleAuthProvider as GoogleProvider
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Set persistence to LOCAL (survives browser restart)
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Persistence error:', error);
  });

// Initialize Google Auth Provider
const googleProvider = new GoogleProvider();

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

class FirebaseAuthService {
  constructor() {
    this.auth = auth;
    this.db = db;
    this.currentUser = null;
    
    // Set up auth state listener
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      // Store user in localStorage for persistence
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified
        }));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Sign up with email and password
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (!userCredential.user.emailVerified) {
        throw new Error('Please verify your email before signing in');
      }
      return userCredential.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Link Google account with existing email/password account
  async linkWithGoogle() {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser) {
        return {
          success: false,
          error: 'No user found'
        };
      }

      const result = await linkWithPopup(currentUser, googleProvider);
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error('Link Google Error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Resend verification email
  async resendVerificationEmail() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    const user = this.getCurrentUser();
    return user !== null && user.emailVerified;
  }

  // Get user auth state observer
  onAuthStateChanged(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  // Helper method to get user-friendly error messages
  getErrorMessage(error) {
    console.error('Auth Error:', error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/popup-closed-by-user':
        return 'Sign in was cancelled.';
      case 'auth/popup-blocked':
        return 'Sign in popup was blocked. Please allow popups for this site.';
      case 'auth/redirect-cancelled-by-user':
        return 'Sign in was cancelled.';
      case 'auth/redirect-operation-pending':
        return 'Another sign in is in progress.';
      case 'auth/unauthorized-domain':
        return 'This domain is not authorized for OAuth operations.';
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please check your email and password.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email but different sign-in credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return error.message || 'An error occurred. Please try again.';
    }
  }

  handleAuthError(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('This email is already registered. Please sign in instead.');
      case 'auth/invalid-credential':
        return new Error('Invalid email or password. Please try again.');
      case 'auth/user-not-found':
        return new Error('No account found with this email. Please sign up first.');
      case 'auth/wrong-password':
        return new Error('Incorrect password. Please try again.');
      case 'auth/too-many-requests':
        return new Error('Too many failed attempts. Please try again later.');
      case 'auth/popup-closed-by-user':
        return new Error('Sign-in was cancelled. Please try again.');
      case 'auth/popup-blocked':
        return new Error('Pop-up was blocked by your browser. Please allow pop-ups for this site.');
      default:
        return new Error('An error occurred during authentication. Please try again.');
    }
  }
}

// Create a singleton instance
const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
export { auth, db }; 