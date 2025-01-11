import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  MainTabs: { screen: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const ReferralScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const referralCode = 'ABC123';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join using my referral code: ${referralCode}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Referral Code</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity onPress={handleShare}>
              <Icon name="content-copy" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            Share this referral code with your friends.
          </Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Text style={styles.shareButtonText}>Share Referral Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
  },
  shareButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ReferralScreen; 