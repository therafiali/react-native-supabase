import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export const HomeScreen = () => {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Home</Text>
        <Text style={styles.subtitle}>
          Logged in as: {user?.email}
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={signOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    width: '30%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 