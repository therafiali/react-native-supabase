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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.35;
const SPACING = 16;

type RootStackParamList = {
  EnterUsername: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EnterUsername'>;

const platforms = [
  {
    id: '1',
    title: 'ORION STARS',
    subtitle: 'Tap the button below to Play',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
    playUrl: 'http://start.orionstars.vip:8580/index.html?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiIyODk0M2I5ZmMyZDk0MjI0MzU4YzI1NWFiZDFmMjdkZSIsInRzIjoxNzM2NjE3MTAyLCJleHAiOjE3MzkwMzYzMDJ9.CyBMJobAJJTpvpvx7Lo29afoede84AeKucNovNbhp44',
    downloadUrl: 'https://orionstar.us/download',
  },
  {
    id: '2',
    title: 'FIRE KIRIN',
    subtitle: 'Tap the button below to Play',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
    playUrl: 'http://firekirin.xyz:8580/index.html',
    downloadUrl: 'https://firekirin.com/download',
  },
  {
    id: '3',
    title: 'GAME VAULT',
    subtitle: 'Tap the button below to Play',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnARhUnAhl29QEtORTociKKfPU_ZvcVud6INF4mJ8LeoPXLE2ls6TDLfHb_kv71m0JKk0&usqp=CAU',
    playUrl: 'http://gamevault.me:8580/index.html',
    downloadUrl: 'https://gamevault.com/download',
  },
  {
    id: '4',
    title: 'VBLINK',
    subtitle: 'Tap the button below to Play',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bkKRMKvP3m1mXAb2rV1BOGUgioJMzc26DA&s',
    playUrl: 'https://www.vblink777.club/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiI2ZjM1YTM1OTU0N2MwOWZiYWMzOTUyNzI1NTBjNWNkZSIsInRzIjoxNzM2NjE3MjYwLCJleHAiOjE3MzkwMzY0NjB9.nj_PehGSp-e0OzFlAWBPztAp__N7gpiC6MfXb8n90zU',
    downloadUrl: 'https://www.vblink777.club/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiI2ZjM1YTM1OTU0N2MwOWZiYWMzOTUyNzI1NTBjNWNkZSIsInRzIjoxNzM2NjE3MjYwLCJleHAiOjE3MzkwMzY0NjB9.nj_PehGSp-e0OzFlAWBPztAp__N7gpiC6MfXb8n90zU',
  },
  {
    id: '5',
    title: 'VEGAS SWEEPS',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
    playUrl: 'https://m.lasvegassweeps.com/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJlOTk2NmUxN2I3OWUzZDRkNTE2YTg3ZWYyMjNjOThhYSIsInRzIjoxNzM2NjE3MjY4LCJleHAiOjE3MzkwMzY0Njh9.iEW-Ggq0J91GkBjo6v9F7SXrtFvvZDJTOlzGlaP_bH0',
    downloadUrl: 'https://m.lasvegassweeps.com/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJlOTk2NmUxN2I3OWUzZDRkNTE2YTg3ZWYyMjNjOThhYSIsInRzIjoxNzM2NjE3MjY4LCJleHAiOjE3MzkwMzY0Njh9.iEW-Ggq0J91GkBjo6v9F7SXrtFvvZDJTOlzGlaP_bH0',
  },
  {
    id: '6',
    title: 'ULTRA PANDA',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
    playUrl: 'https://www.ultrapanda.mobi/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJlNTY4ZGU1NjQ0Mzk2YTdmNDJmOTNkMDMzOWI4MWY1ZiIsInRzIjoxNzM2NjE3MzE0LCJleHAiOjE3MzkwMzY1MTR9.mimtqc1NXVfw_95AjcSMCx5eChPduL6XSybpH_5gIIY',
    downloadUrl: 'https://www.ultrapanda.mobi/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJlNTY4ZGU1NjQ0Mzk2YTdmNDJmOTNkMDMzOWI4MWY1ZiIsInRzIjoxNzM2NjE3MzE0LCJleHAiOjE3MzkwMzY1MTR9.mimtqc1NXVfw_95AjcSMCx5eChPduL6XSybpH_5gIIY',
  },
  {
    id: '7',
    title: 'YOLO',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnARhUnAhl29QEtORTociKKfPU_ZvcVud6INF4mJ8LeoPXLE2ls6TDLfHb_kv71m0JKk0&usqp=CAU',
    playUrl: 'https://yolo777.game/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiIxYTM2YjZlNzNlOTI3Mjc2MGJkYjczNGZmNmUxNGM3MCIsInRzIjoxNzM2NjE3MzIzLCJleHAiOjE3MzkwMzY1MjN9.MxukMgfbJNPTp4pFw60G1eRTxXre3p-UyqzP16_lwH4',
    downloadUrl: 'https://yolo777.game/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiIxYTM2YjZlNzNlOTI3Mjc2MGJkYjczNGZmNmUxNGM3MCIsInRzIjoxNzM2NjE3MzIzLCJleHAiOjE3MzkwMzY1MjN9.MxukMgfbJNPTp4pFw60G1eRTxXre3p-UyqzP16_lwH4',
  },
  {
    id: '8',
    title: 'JUWA',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bkKRMKvP3m1mXAb2rV1BOGUgioJMzc26DA&s',
    playUrl: 'https://dl.juwa777.com/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJmNTgxMmMyMGMwN2QxNmU0NWIzNzc3NmY2ZjdhNDc2MCIsInRzIjoxNzM2NjE3MzMyLCJleHAiOjE3MzkwMzY1MzJ9.dXadE4vmGW2OMQZfVGzv1LLvNgqJg-Dt8lBms5RtT0Y',
    downloadUrl: 'https://dl.juwa777.com/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJmNTgxMmMyMGMwN2QxNmU0NWIzNzc3NmY2ZjdhNDc2MCIsInRzIjoxNzM2NjE3MzMyLCJleHAiOjE3MzkwMzY1MzJ9.dXadE4vmGW2OMQZfVGzv1LLvNgqJg-Dt8lBms5RtT0Y',
  },
  {
    id: '9',
    title: 'MOOLAH',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
    playUrl: 'https://moolah.vip:8888/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJlYmNkYjAxODRlNGRkZTFlNjE2MTY3MGM2OGU4ZDRkYSIsInRzIjoxNzM2NjE3MzQzLCJleHAiOjE3MzkwMzY1NDN9.lLL29uBM7RKR_dkh7L_D3N3_z0nT9lnEdcSKr3m8IQE',
    downloadUrl: 'https://moolah.vip:8888/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiJlYmNkYjAxODRlNGRkZTFlNjE2MTY3MGM2OGU4ZDRkYSIsInRzIjoxNzM2NjE3MzQzLCJleHAiOjE3MzkwMzY1NDN9.lLL29uBM7RKR_dkh7L_D3N3_z0nT9lnEdcSKr3m8IQE',
  },
  {
    id: '10',
    title: 'PANDA MASTER',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
    playUrl: 'https://pandamaster.vip:8888/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiI5Yjk3YTJhZTZmNGUxZTk3NDRiNjlhNzIwOTg5ZTc5ZiIsInRzIjoxNzM2NjE3MzU0LCJleHAiOjE3MzkwMzY1NTR9.zGYOqC1o5aLAnJ6cWU-ELt6FGAyWksA1We25gQ5k96Q',
    downloadUrl: 'https://pandamaster.vip:8888/?mcp_token=eyJwaWQiOjM5ODc3OTQ5NjY1NTMzMCwic2lkIjoyODExNjI0NDgwMTMyNDYxOSwiYXgiOiI5Yjk3YTJhZTZmNGUxZTk3NDRiNjlhNzIwOTg5ZTc5ZiIsInRzIjoxNzM2NjE3MzU0LCJleHAiOjE3MzkwMzY1NTR9.zGYOqC1o5aLAnJ6cWU-ELt6FGAyWksA1We25gQ5k96Q',
  },
];



const SelectPlatformScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [selectedGameName, setSelectedGameName] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Add filtered platforms logic
  const filteredPlatforms = platforms.filter(platform =>
    platform.title.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // Reset active index and selection when search changes
  useEffect(() => {
    setActiveIndex(0);
    const firstPlatform = filteredPlatforms[0];
    if (firstPlatform) {
      handleGameSelect(firstPlatform.id);
    } else {
      // Clear selection if no results found
      setSelectedGame(null);
      setSelectedGameName('');
    }
  }, [searchQuery]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + SPACING));
    setActiveIndex(index);
    
    // Automatically select the visible platform
    const visiblePlatform = filteredPlatforms[index];
    if (visiblePlatform) {
      handleGameSelect(visiblePlatform.id);
    }
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    const game = platforms.find(p => p.id === gameId);
    if (game) {
      setSelectedGameName(game.title);
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
        {/* Header with Search */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Platform to Redeem</Text>
        </View>

        {/* Platforms Carousel */}
        <View style={styles.carouselWrapper}>
          {filteredPlatforms.length > 0 ? (
            <>
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
                {filteredPlatforms.map((platform) => (
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
                      <Text style={styles.platformName}>{platform.title}</Text>
                      <Text style={styles.platformText}>Tap the button below to Redeem</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Pagination Dots */}
              <View style={styles.pagination}>
                {filteredPlatforms.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === activeIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No games found</Text>
              <Text style={styles.noResultsSubText}>Try a different search term</Text>
            </View>
          )}
        </View>

        {/* Username Input Section */}
        <View style={styles.bottomContainer}>
          <Text style={styles.description}>
            Please enter your {selectedGameName} username{'\n'}
            you want to redeem from?
          </Text>
          <Text style={styles.headergameTitle}>Enter Game Username</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  headergameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    paddingVertical: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollView: {
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: 'white',
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
    borderColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 2,
    // borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#0066FF',
    borderWidth: 3,
    shadowColor: '#0066FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
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
  noResultsContainer: {
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: SPACING,
    paddingVertical: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default SelectPlatformScreen; 