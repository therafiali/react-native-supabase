import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      Alert.alert('Success', 'Password has been reset successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 