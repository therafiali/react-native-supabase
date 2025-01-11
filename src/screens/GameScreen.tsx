import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const games = [
  {
    id: '1',
    title: 'ORION STARS',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
  },
  {
    id: '2',
    title: 'FIRE KIRIN',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
  },
  {
    id: '3',
    title: 'GAME VAULT',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnARhUnAhl29QEtORTociKKfPU_ZvcVud6INF4mJ8LeoPXLE2ls6TDLfHb_kv71m0JKk0&usqp=CAU',
  },
  {
    id: '4',
    title: 'VBLINK',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bkKRMKvP3m1mXAb2rV1BOGUgioJMzc26DA&s',
  },
  {
    id: '5',
    title: 'ORION STARS',
    image: 'https://oriongames.net/wp-content/uploads/2022/04/LibraryHeroImage-1920x620.png',
  },
  {
    id: '6',
    title: 'FIRE KIRIN',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs73q_9baM_h0QX1WfckYymxwUFscsgDmDoA&s',
  },
  {
    id: '7',
    title: 'GAME VAULT',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnARhUnAhl29QEtORTociKKfPU_ZvcVud6INF4mJ8LeoPXLE2ls6TDLfHb_kv71m0JKk0&usqp=CAU',
  },
  {
    id: '8',
    title: 'VBLINK',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bkKRMKvP3m1mXAb2rV1BOGUgioJMzc26DA&s',
  },
];

const GameScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Games</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search games"
            placeholderTextColor="#999"
          />
        </View>

        {/* Games Grid */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.gamesGrid}>
            {games.map((game) => (
              <View key={game.id} style={styles.gameCard}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: game.image }}
                    style={styles.gameImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.subtitle}>Tap the button below to Play</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.playButton}>
                    <Text style={styles.buttonText}>Play</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.buttonText}>Download</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  gamesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 4,
  },
  downloadButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default GameScreen; 