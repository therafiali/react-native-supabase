import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.35;
const SPACING = 16;

type RootStackParamList = {
  EnterUsername: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EnterUsername'>;

const platforms = [
  {
    id: '1',
    name: 'ORION STARS',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
  },
  {
    id: '2',
    name: 'FIRE KIRIN',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
  },
  {
    id: '3',
    name: 'GAME VAULT',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnARhUnAhl29QEtORTociKKfPU_ZvcVud6INF4mJ8LeoPXLE2ls6TDLfHb_kv71m0JKk0&usqp=CAU',
  },
  {
    id: '4',
    name: 'VBLINK',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bkKRMKvP3m1mXAb2rV1BOGUgioJMzc26DA&s',
  },
  {
    id: '5',
    name: 'LUCKY STARS',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
  },
  {
    id: '6',
    name: 'ULTRA PANDA',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
  },
];

const SelectPlatformScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [selectedGameName, setSelectedGameName] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + SPACING));
    setActiveIndex(index);
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    const game = platforms.find(p => p.id === gameId);
    if (game) {
      setSelectedGameName(game.name);
    }
  };

  useEffect(() => {
    if (selectedGameName) {
      setSelectedGame(`${selectedGameName}`);
    }
  }, [selectedGameName]);

  const handleSubmit = () => {
    if (selectedGame && username) {
      setShowConfirmModal(true);
    }
  };

  const handleProceed = () => {
    setShowConfirmModal(false);
    navigation.navigate('ReviewRequest', {
      platform: selectedGameName,
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
          <Text style={styles.headerTitle}>Select Platform</Text>
          <View style={styles.profileBadge}>
            <Text style={styles.profileText}>JD</Text>
          </View>
        </View>

        {/* Platforms Carousel */}
        <View style={styles.carouselWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
          >
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                onPress={() => handleGameSelect(platform.id)}
                style={[
                  styles.platformCard,
                  selectedGame === platform.id && styles.selectedCard
                ]}
              >
                <Image
                  source={{ uri: platform.image }}
                  style={styles.platformImage}
                  resizeMode="cover"
                />
                <View style={styles.platformInfo}>
                  <Text style={styles.platformName}>{platform.name}</Text>
                  <Text style={styles.platformText}>Tap the button below to Redeem</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {platforms.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Username Input Section */}
        <View style={styles.bottomContainer}>
          <Text style={styles.description}>
            Please enter your {selectedGameName} username{'\n'}
            you want to redeem from?
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter username..."
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedGame || !username) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!selectedGame || !username}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>


        {/* Confirmation Modal */}
        <Modal
          visible={showConfirmModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Is the username correct?</Text>
              <Text style={styles.modalUsername}>Username: {username}</Text>
              <Text style={styles.modalDescription}>
                If it's correct Tap 'Proceed' and if you{'\n'}want to edit it Tap 'Edit'
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.editButton]}
                  onPress={() => setShowConfirmModal(false)}
                >
                  <Text style={[styles.modalButtonText, styles.editButtonText]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.proceedButton]}
                  onPress={handleProceed}
                >
                  <Text style={[styles.modalButtonText, styles.proceedButtonText]}>Proceed</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  profileBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  carouselWrapper: {
    marginTop: 20,
  },
  carouselContainer: {
    paddingHorizontal: SPACING,
  },
  platformCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginRight: SPACING,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  selectedCard: {
    borderColor: '#0066FF',
    borderWidth: 2,
  },
  platformImage: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  platformInfo: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  platformName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  platformText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: '#000',
  },
  bottomContainer: {
    padding: 24,
    paddingTop: 0,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  modalUsername: {
    fontSize: 16,
    color: '#333',
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
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF69B4',
  },
  proceedButton: {
    backgroundColor: '#ADFF2F',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  editButtonText: {
    color: '#FF69B4',
  },
  proceedButtonText: {
    color: '#000',
  },
});

export default SelectPlatformScreen; 