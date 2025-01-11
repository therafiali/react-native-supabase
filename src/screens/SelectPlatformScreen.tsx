import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';

const { width } = Dimensions.get('window');

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
        </View>

        {/* Platforms Grid */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.grid}>
            {platforms.map((platform) => (
              <View key={platform.id} style={styles.platformCard}>
                <Image
                  source={{ uri: platform.image }}
                  style={styles.platformImage}
                  resizeMode="cover"
                />
                <View style={styles.platformInfo}>
                  <Text style={styles.congratsText}>Congrats 🎉</Text>
                  <Text style={styles.platformText}>Tap the button below to Redeem</Text>
                  <TouchableOpacity 
                    style={styles.redeemButton}
                    onPress={() => navigation.navigate('EnterUsername')}
                  >
                    <Text style={styles.redeemButtonText}>REDEEM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  platformCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  platformImage: {
    width: '100%',
    height: (width - 48) / 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  platformInfo: {
    padding: 12,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  platformText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  redeemButton: {
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    width: '100%',
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SelectPlatformScreen; 