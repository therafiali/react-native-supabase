import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const NOTIFICATIONS = [
  {
    id: '1',
    name: 'James Anderson',
    type: 'deposit',
    amount: '$700',
    date: '25 September 2023',
    status: 'success',
  },
  {
    id: '2',
    name: 'James Anderson',
    type: 'withdrawal',
    amount: '$700',
    date: '25 September 2023',
    status: 'fail',
  },
  {
    id: '3',
    name: 'James Anderson',
    type: 'deposit',
    amount: '$700',
    date: '25 September 2023',
    status: 'success',
  },
  {
    id: '4',
    name: 'James Anderson',
    type: 'withdrawal',
    amount: '$700',
    date: '25 September 2023',
    status: 'fail',
  },
  {
    id: '5',
    name: 'James Anderson',
    type: 'deposit',
    amount: '$700',
    date: '25 September 2023',
    status: 'success',
  },
];

const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState('wallet');

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'wallet' && styles.activeTab]}
            onPress={() => setActiveTab('wallet')}>
            <Text style={[styles.tabText, activeTab === 'wallet' && styles.activeTabText]}>
              Wallet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'games' && styles.activeTab]}
            onPress={() => setActiveTab('games')}>
            <Text style={[styles.tabText, activeTab === 'games' && styles.activeTabText]}>
              Games
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView style={styles.notificationsList}>
          {NOTIFICATIONS.map((notification) => (
            <TouchableOpacity key={notification.id} style={styles.notificationItem}>
              <View style={styles.notificationContent}>
                <View>
                  <Text style={styles.name}>{notification.name}</Text>
                  <Text style={styles.type}>{notification.type}</Text>
                  <Text style={styles.date}>{notification.date}</Text>
                </View>
                <View style={styles.rightContent}>
                  <Text style={[
                    styles.amount,
                    notification.status === 'fail' && styles.failText
                  ]}>
                    {notification.status === 'fail' ? 'Fail' : notification.amount}
                  </Text>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#666666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '500',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
  },
  failText: {
    color: '#FF0000',
  },
  arrow: {
    fontSize: 18,
    color: '#666666',
  },
});

export default NotificationsScreen; 