import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

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
    <ScreenWrapper profileBar={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#F0F0F0']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Review Request</Text>
          </View>

          <View style={styles.content}>
            <LinearGradient
              colors={['#F0F0F0', '#FFFFFF']}
              style={styles.iconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="clipboard-check-outline" size={32} color="#000" />
            </LinearGradient>
            
            <Text style={styles.description}>
              Please verify your recharge details
            </Text>

            <View style={styles.detailsContainer}>
              <LinearGradient
                colors={['#FFFFFF', '#FAFAFA']}
                style={styles.detailCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Icon name="account" size={16} color="#666" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Username</Text>
                    <Text style={styles.detailValue}>{username}</Text>
                  </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Icon name="currency-usd" size={16} color="#666" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Amount</Text>
                    <Text style={styles.detailValue}>${amount}</Text>
                  </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Icon name="gamepad-variant" size={16} color="#666" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Platform</Text>
                    <Text style={styles.detailValue}>{platform}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.confirmText}>
              Is all the information correct?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.noButton]}
                onPress={handleNo}
              >
                <LinearGradient
                  colors={['#FFE5E5', '#FFF0F0']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="pencil" size={18} color="#FF4444" style={styles.buttonIcon} />
                  <Text style={[styles.buttonText, styles.noButtonText]}>Edit</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.yesButton]}
                onPress={handleYes}
              >
                <LinearGradient
                  colors={['#CCFF00', '#B8E600']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="check" size={18} color="#000" style={styles.buttonIcon} />
                  <Text style={[styles.buttonText, styles.yesButtonText]}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <Modal
          visible={isLoading || isCompleted}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {isLoading ? (
                <>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator 
                      size="large" 
                      color="#000000" 
                      style={styles.loader}
                    />
                    <Text style={styles.modalTitle}>
                      Submitting your request...
                    </Text>
                    <Text style={styles.modalSubtitle}>
                      Please wait a moment
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.successContainer}>
                  <Icon name="check-circle" size={60} color="#00C853" style={styles.successIcon} />
                  <Text style={styles.successTitle}>Request Submitted!</Text>
                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={handleDone}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
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
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  description: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  detailCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
    marginVertical: 2,
  },
  confirmText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 8,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonIcon: {
    marginRight: 6,
  },
  noButton: {
    borderWidth: 1,
    borderColor: '#FFD6D6',
  },
  yesButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noButtonText: {
    color: '#FF4444',
  },
  yesButtonText: {
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successContainer: {
    alignItems: 'center',
    // padding: 20,
  },
  successIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
  },
  loader: {
    marginBottom: 16,
  },
  doneButton: {
    backgroundColor: '#CCFF00',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default ReviewRequestScreen; 