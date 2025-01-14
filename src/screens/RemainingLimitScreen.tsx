import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const RemainingLimitScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Remaining Limits</Text>

      {/* Progress Image */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Progress</Text>
        <View style={styles.progressContainer}>
          <Image
            source={{
              uri: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg', // Replace with your actual CDN image URL
            }}
            style={styles.progressImage}
            resizeMode="contain"
          />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>Daily Limits</Text>
            <Text style={styles.progressAmount}>$1900/2000</Text>
          </View>
        </View>
      </View>

      {/* Platform Limits */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Platform Limits</Text>
        <View style={styles.platformList}>
          {[
            { name: 'Orion Stars', limit: '$400/500', pending: '$100' },
            { name: 'Fire Kirin', limit: '$500/500' },
            { name: 'Game Vault', limit: '$500/500' },
            { name: 'Vblink', limit: '$500/500' },
            { name: 'Vegas Sweeps', limit: '$500/500' },
            { name: 'Ultra Panda', limit: '$500/500' },
            { name: 'Juwa', limit: '$500/500' },
            { name: 'Moolah', limit: '$500/500' },
            { name: 'Panda Master', limit: '$500/500' },
          ].map((platform, index) => (
            <View style={styles.platformItem} key={index}>
              <Text style={styles.platformName}>{platform.name}:</Text>
              <Text style={styles.platformLimit}>
                {platform.limit}
                {platform.pending ? ` (Pending: ${platform.pending})` : ''}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressImage: {
    width: 150,
    height: 150,
  },
  progressTextContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  progressAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4630EB',
  },
  platformList: {
    marginTop: 10,
  },
  platformItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  platformLimit: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4630EB',
  },
});

export default RemainingLimitScreen;
