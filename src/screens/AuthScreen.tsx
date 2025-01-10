import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        Alert.alert('Success', 'Please check your email for verification');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
}); 