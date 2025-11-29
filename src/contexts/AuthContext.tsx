import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { 
  initializeFirebaseAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut
} from '../services/firebase';

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      }
      
      Alert.alert('Registration Error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      
      Alert.alert('Login Error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error: any) {
      Alert.alert('Sign Out Error', error?.message ?? 'Could not sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      try {
        console.log('Starting auth initialization...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const auth = await initializeFirebaseAuth();
        
        if (!auth) {
          throw new Error('Auth instance is null');
        }

        unsubscribe = auth.onAuthStateChanged((firebaseUser: User | null) => {
          console.log('Auth state changed:', firebaseUser?.email);
          setUser(firebaseUser);
          setLoading(false);
          setInitialized(true);
        });

        console.log('Auth listener setup successfully');
        
      } catch (error) {
        console.error('Auth initialization failed:', error);
        
        Alert.alert(
          'Authentication Error',
          'Failed to initialize Firebase Authentication. This may be due to compatibility issues with Expo Go. Please try:\n\n1. Restarting the app\n2. Clearing cache (expo start -c)\n3. Using a development build for full Firebase features',
          [{ text: 'OK' }]
        );
        
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      initialized,
      signUp: handleSignUp,
      signIn: handleSignIn,
      signOut: handleSignOut,
    }),
    [user, loading, initialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};