import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CheckStatusScreen = () => {
  // Replace with dynamic data if required
  const redeemRequests = [
    {
      id: 'R-9T250',
      amount: '$100.00',
      platform: 'Orion Stars',
      status: 'Pending',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Check Status</Text>

      {/* Redeem Requests Card */}
      {redeemRequests.map((request, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>Your Redeem Requests</Text>
          <View style={styles.requestDetails}>
            <Text style={styles.detailItem}>Redeem ID: {request.id}</Text>
            <Text style={styles.detailItem}>Amount: {request.amount}</Text>
            <Text style={styles.detailItem}>Platform: {request.platform}</Text>
            <Text style={styles.detailItem}>Status: {request.status}</Text>
          </View>
        </View>
      ))}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  requestDetails: {
    marginTop: 10,
  },
  detailItem: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
});

export default CheckStatusScreen;
