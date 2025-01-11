import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  SelectPlatform: undefined;
  ReviewRequest: {
    platform: string;
    username: string;
    amount: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SelectPlatform'>;

const EnterUsernameScreen = () => {
  const [username, setUsername] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = () => {
    if (username.trim()) {
      setShowConfirmation(true);
    }
  };

  const handleProceed = () => {
    setShowConfirmation(false);
    navigation.navigate('ReviewRequest', {
      platform: 'Orion Stars',
      username: username,
      amount: '300',
    });
  };

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
          <Text style={styles.headerTitle}>Enter Username</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.description}>
            Please enter your Orion Star's username{'\n'}
            you want to redeem from?
          </Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username..."
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton,
              !username.trim() && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!username.trim()}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Confirmation Modal */}
        <Modal
          visible={showConfirmation}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Is the username correct?</Text>
              <Text style={styles.modalUsername}>Username: {username}</Text>
              <Text style={styles.modalDescription}>
                If it's correct Tap 'Proceed' and if you{'\n'}
                want to edit it Tap 'Edit'
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.editButton]}
                  onPress={() => setShowConfirmation(false)}
                >
                  <Text style={[styles.modalButtonText, styles.editButtonText]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.proceedButton]}
                  onPress={handleProceed}
                >
                  <Text style={styles.modalButtonText}>Proceed</Text>
                </TouchableOpacity>
              </View>
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
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 40,
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
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 'auto',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: width * 0.85,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalUsername: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF69B4',
  },
  proceedButton: {
    backgroundColor: '#CCFF00',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  editButtonText: {
    color: '#FF69B4',
  },
});

export default EnterUsernameScreen; 