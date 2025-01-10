/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AuthScreen } from './src/screens/AuthScreen';

const MainContent = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <AuthScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
        <Text style={styles.signOutText} onPress={signOut}>
          Sign Out
        </Text>
      </View>
    </SafeAreaView>
  );
};

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  signOutText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default App;
