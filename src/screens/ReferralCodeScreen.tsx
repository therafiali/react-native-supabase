import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const ReferralCodeScreen = () => {
  const navigation = useNavigation();
  const [referralCode, setReferralCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReferralCode();
  }, []);

  const fetchReferralCode = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .single();

      if (error) throw error;
      
      console.log('Referral data:', data);
      if (data) {
        setReferralCode(data.referral_code);
      }
    } catch (error) {
      console.error('Error fetching referral code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing referral code:', referralCode);
  };

  const handleCopy = () => {
    // Implement copy functionality
    console.log('Copying referral code:', referralCode);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Referral Code</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://img.icons8.com/color/200/000000/refer-friend.png' }}
          style={styles.referralImage}
        />

        <View style={styles.codeContainer}>
          {isLoading ? (
            <Text style={styles.code}>Loading...</Text>
          ) : (
            <>
              <Text style={styles.code}>{referralCode}</Text>
              <TouchableOpacity onPress={handleCopy}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios/50/000000/copy.png' }}
                  style={styles.copyIcon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.description}>
          Share this referral code with your friends.
        </Text>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share Referral Code</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  referralImage: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  code: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 12,
  },
  copyIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  shareButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ReferralCodeScreen; 