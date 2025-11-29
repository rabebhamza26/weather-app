import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import LoadingIndicator from '../components/LoadingIndicator';

const LoginScreen: React.FC = () => {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await signIn(email.trim(), password);
    } catch (error) {
    }
  };

  const handleSignUp = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long');
      return;
    }

    try {
      await signUp(email.trim(), password);
    } catch (error) {
    }
  };

  const fillTestCredentials = () => {
    setEmail('test@test.com');
    setPassword('password');
    Alert.alert('Test Credentials', 'Use these to test the app');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>WeatherApp</Text>
          <Text style={styles.subtitle}>Sign in to check the weather</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            onSubmitEditing={handleSignIn}
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSignIn} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.outline, loading && styles.buttonDisabled]} 
            onPress={handleSignUp} 
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.outlineText]}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.testButton}
            onPress={fillTestCredentials}
          >
            <Text style={styles.testButtonText}>Use Test Credentials</Text>
          </TouchableOpacity>

          {loading && <LoadingIndicator />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f3f4f6' 
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  card: { 
    width: '100%', 
    maxWidth: 400,
    padding: 24, 
    backgroundColor: 'white', 
    borderRadius: 16, 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    marginBottom: 8,
    color: '#0ea5e9'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center'
  },
  input: { 
    width: '100%', 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    borderRadius: 12, 
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9fafb'
  },
  button: { 
    width: '100%', 
    padding: 16, 
    backgroundColor: '#0ea5e9', 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 8 
  },
  buttonText: { 
    color: 'white', 
    fontWeight: '600',
    fontSize: 16 
  },
  buttonDisabled: { 
    backgroundColor: '#9ca3af',
    opacity: 0.6 
  },
  outline: { 
    backgroundColor: 'white', 
    borderWidth: 2, 
    borderColor: '#0ea5e9' 
  },
  outlineText: { 
    color: '#0ea5e9' 
  },
  testButton: {
    marginTop: 16,
    padding: 12,
  },
  testButtonText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;