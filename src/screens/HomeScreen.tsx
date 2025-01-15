import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenWrapper from '../components/ScreenWrapper';
import { supabase } from '../lib/supabase';

type RootStackParamList = {
  AmountDepositScreen: undefined;
  EnterAmount: undefined;
  RemainingLimit: undefined;
  CheckStatus: undefined;
  VIPCode: undefined;
  LiveChat: undefined;
  Feedback: undefined;
  ReferralCode: undefined;
  Promotions: undefined;
  Notifications: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EnterAmount'>;

type GridItem = {
  id: string;
  label: string;
  content: string;
  icon: string;
  bgColor: string;
  onPress?: keyof RootStackParamList;
};

const gridItems: GridItem[] = [
  {
    id: 'redeem',
    label: 'Redeem Limits',
    content: 'Available: $0.00',
    icon: 'https://cdn-icons-png.flaticon.com/512/2845/2845886.png',
    bgColor: '#E3F2FD',
    onPress: 'RemainingLimit'
  },
  {
    id: 'support',
    label: 'Support',
    content: '24/7 Live Chat',
    icon: 'https://cdn-icons-png.flaticon.com/512/4233/4233839.png',
    bgColor: '#E8F5E9',
    onPress: 'LiveChat'

  },
  {
    id: 'feedback',
    label: 'Feedback',
    content: 'Share your experience',
    icon: 'https://cdn-icons-png.flaticon.com/512/2558/2558383.png',
    bgColor: '#E0F2F1',
    onPress: 'Feedback'
  },
  {
    id: 'referrals',
    label: 'Referrals',
    content: 'Earn up to $50',
    icon: 'https://cdn-icons-png.flaticon.com/512/1356/1356479.png',
    bgColor: '#F3E5F5',
    onPress: 'ReferralCode'
  },
  {
    id: 'promotions',
    label: 'Promotions',
    content: 'View active offers',
    icon: 'https://cdn-icons-png.flaticon.com/512/9332/9332625.png',
    bgColor: '#E0F7FA',
    onPress: 'Promotions'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    content: 'View history',
    icon: 'https://cdn-icons-png.flaticon.com/512/1584/1584831.png',
    bgColor: '#F3E5F5',
    onPress: 'Notifications'
  }
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const fetchUserBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        setRefreshing(false);
        return;
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('deposit_balance')
        .single();

      if (error) throw error;
      setBalance(userData?.deposit_balance || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserBalance();
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Account & Routing */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Wallet</Text>
          <TouchableOpacity style={styles.routingButton}>


          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          {refreshing ? (
            <View style={styles.balanceAmount}>
              <ActivityIndicator size="small" color="#000000" />
            </View>
          ) : (
            <Text style={styles.balanceAmount}>
              ${balance?.toFixed(2) || '0.00'}
            </Text>
          )}
          <View style={styles.balanceActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AmountDepositScreen')}
            >
              <Icon name="plus" size={20} color="#000" style={styles.actionIcon} />
              <Text style={styles.actionButtonText}>Add Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('EnterAmount')}
            >
              <Icon name="minus" size={20} color="#000" style={styles.actionIcon} />
              <Text style={styles.actionButtonText}>Cash Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Grid Items */}

        <View style={styles.gridContainer}>
          {gridItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => item.onPress && navigation.navigate(item.onPress)}
            >
              <View style={styles.gridItemHeader}>
                <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                  <Image
                    source={{ uri: item.icon }}
                    style={styles.gridIcon}
                  />
                </View>
                <Text style={styles.gridItemLabel}>
                  {item.label}
                </Text>
              </View>
              <Text style={styles.gridItemContent}>{item.content}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  routingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  routingText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 12,
    height: 90,
  },
  gridItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  gridIcon: {
    width: 20,
    height: 20,
  },
  gridItemLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  gridItemContent: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    paddingLeft: 2,
  },
});

export default HomeScreen;
