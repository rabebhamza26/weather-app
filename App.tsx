// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0ea5e9" />
    <Text style={styles.loadingText}>Loading WeatherApp...</Text>
    <Text style={styles.subText}>Initializing authentication...</Text>
  </View>
);

const Root = () => {
  const { user, loading, initialized } = useAuth();

  if (loading || !initialized) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#374151'
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center'
  }
});