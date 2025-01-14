import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';
import { supabase } from '../lib/supabase';

type RootStackParamList = {
  EnterAmount: undefined;
  RemainingLimit: undefined;
  CheckStatus: undefined;
  VIPCode: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EnterAmount'>;

const ICONS = {
  deposit: 'data:image/svg+xml;base64,...', // Replace with your base64 SVG
  withdraw: 'data:image/svg+xml;base64,...', // Replace with your base64 SVG
};

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

      if (error) {
        throw error;
      }

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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Account balance</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <Text style={styles.balanceAmount}>${balance?.toFixed(2) || '0.00'}</Text>
          )}
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Image 
              source={{ uri: ICONS.deposit }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Deposit</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('EnterAmount')}
          >
            <Image 
              source={{ uri: ICONS.withdraw }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Withdraw</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('RemainingLimit')}
          >
            <Text style={styles.actionText}>Remaining Limit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('CheckStatus')}
          >
            <Text style={styles.actionText}>Check Status</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('VIPCode')}
          >
            <Text style={styles.actionText}>VIP Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  actionsContainer: {
    flexDirection: 'column',
    marginTop: 20,
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 16,
    color: '#000000',
  },

  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },

  arrow: {
    position: 'absolute',
    right: 15,
    top: '50%',
    fontSize: 20,
    color: '#4630EB',
  },
});

export default HomeScreen;
