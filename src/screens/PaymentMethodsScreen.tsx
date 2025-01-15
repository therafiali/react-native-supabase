import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

type RootStackParamList = {
  PaymentDetails: {
    selectedMethods: string[];
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'PaymentDetails'>;

const paymentMethods = [
  { 
    id: 'cashapp', 
    name: 'CashApp', 
    icon: 'https://img.icons8.com/ios-filled/50/40C057/cash-app.png',
    placeholder: 'Enter $Cashtag'
  },
  { 
    id: 'chime', 
    name: 'Chime', 
    icon: 'https://img.icons8.com/?size=512&id=mNhj6ePnTBkQ&format=png',
    placeholder: 'Enter ChimeSign'
  },
  { 
    id: 'venmo', 
    name: 'Venmo', 
    icon: 'https://img.icons8.com/ios-filled/50/4AF2F6/venmo.png',
    placeholder: 'Enter Username'
  },
];

const PaymentMethodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

  const togglePaymentMethod = (id: string) => {
    setSelectedMethods(prev => {
      if (prev.includes(id)) {
        return prev.filter(methodId => methodId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <ScreenWrapper profileBar={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
        </View>

        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedMethods.includes(method.id) && styles.selectedMethod
              ]}
              onPress={() => togglePaymentMethod(method.id)}
            >
              <Image source={{ uri: method.icon }} style={styles.methodIcon} />
              <Text style={styles.methodName}>{method.name}</Text>
              <View style={[
                styles.warningIcon,
                selectedMethods.includes(method.id) && styles.warningIconSelected
              ]}>
                <Text style={styles.warningText}>!</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.reviewButton,
            selectedMethods.length === 0 && styles.reviewButtonDisabled
          ]}
          onPress={() => selectedMethods.length > 0 && navigation.navigate('PaymentDetails', { selectedMethods })}
          disabled={selectedMethods.length === 0}
        >
          <Text style={styles.reviewButtonText}>Review</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  methodsContainer: {
    padding: 20,
    gap: 15,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedMethod: {
    backgroundColor: '#00C853',
  },
  methodIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  warningIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningIconSelected: {
    backgroundColor: '#FFFFFF',
  },
  warningText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  reviewButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentMethodsScreen; 