import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileButton from './ProfileButton';

interface ScreenWrapperProps {
  children: React.ReactNode;
  profileBar?: boolean;
}

const ScreenWrapper = ({ children, profileBar }: ScreenWrapperProps) => {
  console.log(profileBar, '===========>>');

  return (
    <SafeAreaView style={styles.container}>
      {children}
      {profileBar !== false && <ProfileButton />}
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