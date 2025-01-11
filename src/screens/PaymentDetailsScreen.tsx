import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

type RouteParams = {
  selectedMethods: string[];
};

type RootStackParamList = {
  ReviewRequest: {
    platform: string;
    username: string;
    amount: string;
    paymentDetails: Array<{
      method: string;
      id: string;
    }>;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ReviewRequest'>;

type PaymentInput = {
  method: string;
  value: string;
  error: string;
};

const PaymentDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { selectedMethods } = route.params as RouteParams;
  
  const [paymentInputs, setPaymentInputs] = useState<PaymentInput[]>(
    selectedMethods.map(method => ({
      method,
      value: '',
      error: '',
    }))
  );

  const validatePaymentId = (method: string, value: string) => {
    switch (method) {
      case 'cashapp':
        if (!value.startsWith('$')) return 'Cashtag must start with $';
        if (value.length < 2) return 'Please enter a valid Cashtag';
        break;
      case 'chime':
        if (!value.startsWith('$')) return 'ChimeSign must start with $';
        if (value.length < 2) return 'Please enter a valid ChimeSign';
        break;
      case 'venmo':
        if (!value.startsWith('@')) return 'Username must start with @';
        if (value.length < 2) return 'Please enter a valid username';
        break;
    }
    return '';
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...paymentInputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setPaymentInputs(newInputs);
  };

  const handleSubmit = () => {
    let hasError = false;
    const newInputs = paymentInputs.map(input => {
      const error = validatePaymentId(input.method, input.value);
      if (error) hasError = true;
      return { ...input, error };
    });

    setPaymentInputs(newInputs);

    if (!hasError) {
      const paymentDetails = paymentInputs.map(input => ({
        method: input.method,
        id: input.value,
      }));

      navigation.navigate('ReviewRequest', {
        platform: 'Orion Stars',
        username: 'Test001',
        amount: '300',
        paymentDetails,
      });
    }
  };

  const getMethodTitle = (method: string) => {
    switch (method) {
      case 'cashapp': return 'Enter $Cashtag';
      case 'chime': return 'Enter ChimeSign';
      case 'venmo': return 'Enter Username';
      default: return '';
    }
  };

  const getMethodPlaceholder = (method: string) => {
    switch (method) {
      case 'cashapp': return 'Enter cashtag (including the \'$\' sign)';
      case 'chime': return 'Enter chimesign (including the \'$\' sign)';
      case 'venmo': return 'Enter username (including the \'@\' sign)';
      default: return '';
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
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Details</Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.description}>
            Please provide the payment details for your selected methods
          </Text>

          {paymentInputs.map((input, index) => (
            <View key={input.method} style={styles.inputContainer}>
              <Text style={styles.label}>{getMethodTitle(input.method)}</Text>
              <TextInput
                style={[styles.input, input.error ? styles.inputError : null]}
                placeholder={getMethodPlaceholder(input.method)}
                value={input.value}
                onChangeText={(value) => handleInputChange(index, value)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {input.error ? <Text style={styles.errorText}>{input.error}</Text> : null}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={[
            styles.submitButton,
            !paymentInputs.every(input => input.value.trim()) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!paymentInputs.every(input => input.value.trim())}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderBottomColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentDetailsScreen; 