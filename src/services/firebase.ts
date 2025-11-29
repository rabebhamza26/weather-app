import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2zWl4vX4EXRTPaFTNIWs8r_m4TEKKJbQ",
  authDomain: "my-weather-app-36c96.firebaseapp.com",
  projectId: "my-weather-app-36c96",
  storageBucket: "my-weather-app-36c96.firebasestorage.app",
  messagingSenderId: "268922809270",
  appId: "1:268922809270:web:bdd4789384d246969e6f17"
};

const app = initializeApp(firebaseConfig);
console.log('Firebase App initialized');

let authInstance: any = null;

export const initializeFirebaseAuth = async (): Promise<any> => {
  if (authInstance) return authInstance;

  try {
    // Use the compat version which is more stable with Expo
    const firebaseAuth = await import('firebase/compat/auth');
    const firebaseApp = await import('firebase/compat/app');
    
    // Initialize compat app
    const compatApp = firebaseApp.default.initializeApp(firebaseConfig);
    
    // Get auth instance from compat
    authInstance = compatApp.auth();
    
    console.log('Firebase Auth initialized successfully with compat version');
    return authInstance;
    
  } catch (error) {
    console.error('Firebase Auth compat initialization failed:', error);
    throw error;
  }
};

// Export auth methods using compat version
export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  const auth = await initializeFirebaseAuth();
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const auth = await initializeFirebaseAuth();
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  const auth = await initializeFirebaseAuth();
  return auth.signOut();
};

// Export for context
export const getAuth = () => authInstance;
export { app };
export default app;