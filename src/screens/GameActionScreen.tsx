import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

type RootStackParamList = {
  SelectPlatform: undefined;
  EnterUsername: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SelectPlatform'>;

const { width } = Dimensions.get('window');
const DIAL_PAD_WIDTH = width * 0.7;

const GameActionScreen = () => {
  const [amount, setAmount] = useState('10');
  const [error, setError] = useState('');
  const quickAmounts = [10, 50, 100];
  const navigation = useNavigation<NavigationProp>();

  const handleNumberPress = (num: string) => {
    setError(''); // Clear error when amount changes
    if (num === 'backspace') {
      setAmount(prev => prev.slice(0, -1) || '0');
    } else {
      setAmount(prev => (prev === '0' ? num : prev + num));
    }
  };

  const handleRecharge = () => {
    const numAmount = parseFloat(amount);
    if (numAmount < 10) {
      setError('Amount must be at least $10');
      Alert.alert('Invalid Amount', 'Amount must be at least $10');
    } else {
      setError('');
      navigation.navigate('Promocode');
    }
  };

  const handleRedeem = () => {
    const numAmount = parseFloat(amount);
    if (numAmount < 30) {
      setError('Amount must be at least $30');
      Alert.alert('Invalid Amount', 'Amount must be at least $30');
    } else {
      setError('');
      navigation.navigate('SelectPlatform');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Game Action</Text>
        </View>

        {/* Username */}
        <View style={styles.userContainer}>
          <Text style={styles.username}>@Test001</Text>
        </View>

        {/* Amount Display */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Quick Amount Buttons */}
        <View style={styles.quickAmountContainer}>
          {quickAmounts.map((amt) => (
            <TouchableOpacity
              key={amt}
              style={styles.quickAmountButton}
              onPress={() => setAmount(amt.toString())}>
              <Text style={styles.quickAmountText}>{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Number Pad */}
        <View style={styles.numberPad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['.', '0', '×'],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numberRow}>
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={styles.numberButton}
                  onPress={() => handleNumberPress(num === '×' ? 'backspace' : num)}>
                  <Text style={num === '×' ? styles.backspaceText : styles.numberText}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.rechargeButton}
            onPress={handleRecharge}
          >
            <Text style={styles.buttonText}>Recharge</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.redeemButton}
            onPress={handleRedeem}
          >
            <Text style={styles.buttonText}>Redeem</Text>
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
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  username: {
    fontSize: 16,
    color: '#000',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#FF1493',
    marginRight: 4,
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  quickAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  quickAmountButton: {
    backgroundColor: '#00C853',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    color: 'white',
  },
  quickAmountText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  numberPad: {
    width: DIAL_PAD_WIDTH,
    aspectRatio: 0.8,
    justifyContent: 'center',
    marginBottom: 30,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  numberButton: {
    width: DIAL_PAD_WIDTH / 4,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    color: '#000',
  },
  backspaceText: {
    fontSize: 24,
    color: '#000',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
    paddingBottom: 20,
  },
  rechargeButton: {
    flex: 1,
    fontSize: 18,
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 30,
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  redeemButton: {
    flex: 1,
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 30,
    marginLeft: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default GameActionScreen; 