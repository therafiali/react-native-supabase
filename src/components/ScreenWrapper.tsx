import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileButton from './ProfileButton';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <ProfileButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ScreenWrapper; 