import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Wallet');

  const notifications = {
    Wallet: [
      {
        id: '1',
        type: 'Deposit',
        amount: '+$100.00',
        date: '2024-02-20 14:30',
        status: 'success',
      },
      {
        id: '2',
        type: 'Withdrawal',
        amount: '-$50.00',
        date: '2024-02-19 11:20',
        status: 'success',
      },
    ],
    Games: [
      {
        id: '3',
        game: 'ORION STARS',
        message: 'Won 500 points!',
        date: '2024-02-20 15:45',
      },
      {
        id: '4',
        game: 'FIRE KIRIN',
        message: 'New level unlocked',
        date: '2024-02-19 09:15',
      },
    ],
  };

  const renderWalletNotification = (item) => (
    <View key={item.id} style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationType}>{item.type}</Text>
        <Text style={[
          styles.amount,
          { color: item.type === 'Deposit' ? '#4CAF50' : '#F44336' }
        ]}>
          {item.amount}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={[
        styles.statusIndicator,
        { backgroundColor: item.status === 'success' ? '#4CAF50' : '#F44336' }
      ]} />
    </View>
  );

  const renderGameNotification = (item) => (
    <View key={item.id} style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.gameName}>{item.game}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff&size=128' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Wallet' && styles.activeTab]}
          onPress={() => setActiveTab('Wallet')}
        >
          <Text style={[styles.tabText, activeTab === 'Wallet' && styles.activeTabText]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Games' && styles.activeTab]}
          onPress={() => setActiveTab('Games')}
        >
          <Text style={[styles.tabText, activeTab === 'Games' && styles.activeTabText]}>
            Games
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationList}>
        {activeTab === 'Wallet'
          ? notifications.Wallet.map(renderWalletNotification)
          : notifications.Games.map(renderGameNotification)
        }
      </ScrollView>
    </View>
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
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#0066FF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
  gameName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default NotificationScreen; 