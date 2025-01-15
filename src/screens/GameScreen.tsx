import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';

const games = [
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleStoreLink = (url: string) => {
    navigation.navigate('WebView', { url });
  };

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Play Games</Text>
          </View>
          <View style={[styles.header,{bottom:10}]}>
            <View style={styles.searchContainer}>
              <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search games"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

          </View>

          {/* Games Grid */}
          <ScrollView style={[styles.scrollView,{bottom:10}]}>
            <View style={[styles.gamesGrid]}>
              {filteredGames.map((game) => (
                <View key={game.id} style={styles.gameCard}>
                  <Image source={{ uri: game.image }} style={styles.gameImage} />
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.subtitle}>{game.subtitle}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => handleStoreLink(game.playUrl)}
                    >
                      <Text style={styles.buttonText}>Play</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ paddingBottom: 80 }}></View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 12,
    // marginTop: 12,

  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
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
  gamesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  gameImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 8,
    width: '100%',
  },
  playButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  routingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
});

export default GameScreen; 