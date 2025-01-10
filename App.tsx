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
  ActivityIndicator,
} from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';

const MainContent = () => {
  const { user, loading } = useAuth();

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

  return <HomeScreen />;
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
});

export default App;
