import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

const { width } = Dimensions.get('window');
const DIAL_PAD_WIDTH = width * 0.7;

type RootStackParamList = {
  PaymentMethods: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'PaymentMethods'>;

const WALLET_BALANCE = 100; // Updated to match HomeScreen balance

const AmountDepositScreen = () => {
  const [amount, setAmount] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const navigation = useNavigation<NavigationProp>();
  const quickAmounts = [10, 50, 100];

  const loadingMessages = [
    'Processing your request...',
    'Checking availability...',
    'Verifying transaction details...',
    'Finalizing deposit setup...'
  ];

  const handleNumberPress = (num: string) => {
    if (num === 'backspace') {
      setAmount(prev => prev.slice(0, -1) || '0');
    } else {
      setAmount(prev => (prev === '0' ? num : prev + num));
    }
  };

  const handleContinue = () => {
    const numAmount = parseFloat(amount);
    if (numAmount <= 0) {
      Alert.alert(
        'Minimum amount is 10',
        'The amount entered must be greater than 0.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    setIsLoading(true);
    // Update loading message every 2.5 seconds
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2500);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setLoadingStep(0);
      navigation.navigate('PaymentMethodDeposit');
    }, 10000);
  };

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loaderText}>{loadingMessages[loadingStep]}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Amount</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Pick any amount and balance to enter{'\n'}
          custom amount to deposit.
        </Text>

        {/* Username */}
        <View style={styles.userContainer}>
          <Text style={styles.username}>@Test001</Text>
        </View>

        {/* Amount Display */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>

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

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  userContainer: {
    alignItems: 'center',
    paddingVertical: 16,
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
    color: '#000',
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
  },
  quickAmountText: {
    color: '#FFFFFF',
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
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '90%',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AmountDepositScreen; 