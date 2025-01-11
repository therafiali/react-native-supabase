import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Profile: undefined;
};

const ProfileButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('Profile')}>
      <Image
        source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff&size=128' }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileButton; 