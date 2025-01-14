import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

type RouteParams = {
  username: string;
  amount: string;
  platform: string;
};

type RootStackParamList = {
  MainTabs: { screen: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const ReviewRequestScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { username, amount, platform } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const getMethodDisplayName = (method: string) => {
    switch (method) {
      case 'cashapp': return 'CashApp';
      case 'chime': return 'Chime';
      case 'venmo': return 'Venmo';
      default: return method;
    }
  };

  const handleNo = () => {
    navigation.goBack();
  };

  const handleYes = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
    }, 2000);
  };

  const handleDone = () => {
    // Navigate to MainTabs and set initial screen to wallet
    navigation.navigate('MainTabs', { screen: 'Wallet' });
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
          <Text style={styles.headerTitle}>Review Request</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Please review your Redeem request
          </Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Username: {username}</Text>
            <Text style={styles.detailText}>Amount: ${amount}</Text>
            <Text style={styles.detailText}>Platform: {platform}</Text>
            {/* {paymentDetails?.map((detail, index) => (
              <Text key={index} style={styles.detailText}>
                {getMethodDisplayName(detail.method)}: {detail.id}
              </Text>
            ))} */}
          </View>

          <Text style={styles.confirmText}>
            Is all the information correct?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.noButton]}
              onPress={handleNo}
            >
              <Text style={[styles.buttonText, styles.noButtonText]}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.yesButton]}
              onPress={handleYes}
            >
              <Text style={[styles.buttonText, styles.yesButtonText]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={isLoading || isCompleted}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {isLoading ? (
                <>
                  <Text style={styles.modalTitle}>
                    Submitting your redeem{'\n'}request..
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Please wait a moment.
                  </Text>
                  <ActivityIndicator 
                    size="large" 
                    color="#000000" 
                    style={styles.loader}
                  />
                </>
              ) : (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={handleDone}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
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
    paddingTop: 20,
    alignItems: 'center',
    gap: 20,
    marginTop: 60,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  detailsContainer: {
    marginBottom: 40,
    textAlign: 'center',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 25,
    marginBottom: 10,
    color: '#000',
  },
  confirmText: {
    fontSize: 20  ,
    color: '#000',
    marginBottom: 20,
    marginTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 40,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#FFE4E4',
  },
  yesButton: {
    backgroundColor: '#CCFF00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noButtonText: {
    color: '#FF0000',
  },
  yesButtonText: {
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  doneButton: {
    backgroundColor: '#CCFF00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ReviewRequestScreen; 