import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EnterAmount'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const fetchUserBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
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
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Account & Routing */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Wallet</Text>
          <TouchableOpacity style={styles.routingButton}>
           
          
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <Text style={styles.balanceAmount}>${balance?.toFixed(2) || '0.00'}</Text>
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
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('RemainingLimit')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Icon name="bank-transfer" size={24} color="#2196F3" />
            </View>
            <Text style={styles.gridItemLabel}>Borrow</Text>
            <Text style={styles.gridItemValue}>$0.00</Text>
            <Text style={styles.gridItemSubtext}>Available</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Icon name="bank" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.gridItemLabel}>Taxes</Text>
            <Text style={styles.gridItemSubtext}>Pay $0 to file</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E0F2F1' }]}>
              <Icon name="piggy-bank" size={24} color="#009688" />
            </View>
            <Text style={styles.gridItemLabel}>Savings</Text>
            <Text style={styles.gridItemSubtext}>Up to 4.5% interest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3E5F5' }]}>
              <Icon name="download" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.gridItemLabel}>Paychecks</Text>
            <Text style={styles.gridItemSubtext}>Get direct deposits early</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E0F7FA' }]}>
              <Icon name="bitcoin" size={24} color="#00BCD4" />
            </View>
            <Text style={styles.gridItemLabel}>Bitcoin</Text>
            <Text style={styles.gridItemValue}>$526</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3E5F5' }]}>
              <Icon name="chart-line" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.gridItemLabel}>Stocks</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
    fontWeight: 'bold',
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
    gap: 12,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  gridItemValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  gridItemSubtext: {
    fontSize: 13,
    color: '#666666',
  },
});

export default HomeScreen;
