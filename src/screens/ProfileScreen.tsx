import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ReferralCode: undefined;
  Feedback: undefined;
  Promotions: undefined;
  ResetPassword: undefined;
  AccountSettings: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Clear any stored user data/tokens here
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleMenuPress = (title: string) => {
    if (title === 'Referrals') {
      navigation.navigate('ReferralCode');
    } else if (title === 'Feedback') {
      navigation.navigate('Feedback');
    } else if (title === 'Promotions') {
      navigation.navigate('Promotions');
    } else if (title === 'Security') {
      navigation.navigate('ResetPassword');
    } else if (title === 'Account') {
      navigation.navigate('AccountSettings');
    } else if (title === 'Logout') {
      handleLogout();
    }
  };

  const MENU_ITEMS = [
    {
      id: '1',
      title: 'Account',
      icon: 'account-outline',
    },
    {
      id: '2',
      title: 'Security',
      icon: 'shield-outline',
    },
    {
      id: '3',
      title: 'Promotions',
      icon: 'gift-outline',
    },
    {
      id: '4',
      title: 'Referrals',
      icon: 'share-variant-outline',
    },
    {
      id: '5',
      title: 'Feedback',
      icon: 'message-text-outline',
    },
    {
      id: '6',
      title: 'Logout',
      icon: 'logout',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff&size=128' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@gmail.com</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}>
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color="#333" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
            {index < MENU_ITEMS.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
});

export default ProfileScreen; 