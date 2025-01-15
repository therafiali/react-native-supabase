import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type WalletNotification = {
  id: string;
  type: 'Deposit' | 'Withdrawal';
  amount: string;
  date: string;
  status: string;
};

type GameNotification = {
  id: string;
  type: string;
  game: string;
  message: string;
  date: string;
  isPinned?: boolean;
  title?: string;
};

const initialNotifications = {
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
  ] as WalletNotification[],
  Games: [
    {
      id: '3',
      type: 'game_update',
      game: 'ORION STARS',
      message: 'Won 500 points!',
      date: '2024-02-20 15:45',
    },
    {
      id: '4',
      type: 'game_update',
      game: 'FIRE KIRIN',
      message: 'New level unlocked',
      date: '2024-02-19 09:15',
    },
  ] as GameNotification[],
  Pending: [] as GameNotification[],
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as { activeTab?: string; notification?: GameNotification };
  const [activeTab, setActiveTab] = useState(routeParams?.activeTab || 'Wallet');
  const [refreshing, setRefreshing] = useState(false);

  const [notifications, setNotifications] = useState<{
    Wallet: WalletNotification[];
    Games: GameNotification[];
    Pending: GameNotification[];
  }>(initialNotifications);

  // Handle new notification from route params
  useEffect(() => {
    if (routeParams?.notification) {
      const newNotification: GameNotification = {
        id: Date.now().toString(),
        type: routeParams.notification.type,
        game: routeParams.notification.title || 'Game Update',
        message: routeParams.notification.message,
        date: new Date().toLocaleString(),
        isPinned: routeParams.notification.isPinned,
      };

      setNotifications(prev => ({
        ...prev,
        Pending: [newNotification, ...prev.Pending],
      }));
    }
  }, [routeParams?.notification]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    setNotifications(prev => ({
      Wallet: [],
      Games: [],
      Pending: prev.Pending
    }));
    
    setTimeout(() => {
      setNotifications(prev => ({
        Wallet: initialNotifications.Wallet,
        Games: initialNotifications.Games,
        Pending: prev.Pending
      }));
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderWalletNotification = (item: WalletNotification) => (
    <View key={item.id} style={styles.notificationItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.type === 'Deposit' ? '#E2F8E9' : '#FEE2E2' }]}>
        <Text style={[styles.iconText, { color: item.type === 'Deposit' ? '#22C55E' : '#EF4444' }]}>
          {item.type === 'Deposit' ? '+' : '-'}
        </Text>
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationType}>{item.type}</Text>
          <Text style={[
            styles.amount,
            { color: item.type === 'Deposit' ? '#22C55E' : '#EF4444' }
          ]}>
            {item.amount}
          </Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'success' ? '#E2F8E9' : '#FEE2E2' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: item.status === 'success' ? '#22C55E' : '#EF4444' }
          ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderGameNotification = (item: GameNotification) => (
    <View key={item.id} style={[
      styles.notificationItem,
      item.isPinned && styles.pinnedNotification,
      (activeTab === 'Pending' || activeTab === 'Games') && styles.pendingNotificationItem
    ]}>
      <View style={[
        styles.iconContainer, 
        (activeTab === 'Pending' || activeTab === 'Games') && styles.pendingIconContainer
      ]}>
        <Image 
          source={{ 
            uri: 'https://cdn-icons-png.flaticon.com/512/13/13973.png'
          }}
          style={[
            styles.controllerIcon,
            {
              tintColor: activeTab === 'Games' ? '#0066FF' : activeTab === 'Pending' ? '#1A237E' : '#212529'
            }
          ]}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <View style={styles.gameNameContainer}>
            <Text style={[
              styles.gameName, 
              (activeTab === 'Pending' || activeTab === 'Games') && styles.pendingGameName,
              activeTab === 'Games' && { color: '#0066FF' }
            ]}>
              {item.game}
            </Text>
          </View>
        </View>
        <Text style={[
          styles.message, 
          (activeTab === 'Pending' || activeTab === 'Games') && styles.pendingMessage
        ]}>
          {item.message}
        </Text>
        <Text style={[
          styles.date, 
          (activeTab === 'Pending' || activeTab === 'Games') && styles.pendingDate
        ]}>
          {item.date}
        </Text>
      </View>
    </View>
  );

  const getTabStyle = (tabName: string) => {
    if (activeTab === tabName) {
      switch (tabName) {
        case 'Wallet':
          return { backgroundColor: '#E2F8E9' };
        case 'Games':
          return { backgroundColor: '#E6F0FF' };
        case 'Pending':
          return { backgroundColor: '#FFF8E6' };
        default:
          return {};
      }
    }
    return {};
  };

  const getTabTextStyle = (tabName: string) => {
    if (activeTab === tabName) {
      switch (tabName) {
        case 'Wallet':
          return { color: '#22C55E' };
        case 'Games':
          return { color: '#0066FF' };
        case 'Pending':
          return { color: '#FFB800' };
        default:
          return {};
      }
    }
    return {};
  };

  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile' as never)}
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
          style={[
            styles.tab,
            activeTab === 'Wallet' && styles.activeTab,
            getTabStyle('Wallet')
          ]}
          onPress={() => setActiveTab('Wallet')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Wallet' && styles.activeTabText,
            getTabTextStyle('Wallet')
          ]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Games' && styles.activeTab,
            getTabStyle('Games')
          ]}
          onPress={() => setActiveTab('Games')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Games' && styles.activeTabText,
            getTabTextStyle('Games')
          ]}>
            Games
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Pending' && styles.activeTab,
            getTabStyle('Pending')
          ]}
          onPress={() => setActiveTab('Pending')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Pending' && styles.activeTabText,
            getTabTextStyle('Pending')
          ]}>
            Pending
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationList}
        contentContainerStyle={styles.notificationListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'Wallet' && notifications.Wallet.map(renderWalletNotification)}
        {activeTab === 'Games' && notifications.Games.map(renderGameNotification)}
        {activeTab === 'Pending' && notifications.Pending.map(renderGameNotification)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#212529',
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  activeTab: {
    backgroundColor: '#E9ECEF',
  },
  tabText: {
    fontSize: 15,
    color: '#6C757D',
    textAlign: 'center',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#212529',
    fontWeight: '700',
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  notificationListContent: {
    paddingBottom: 80,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F8F9FA',
  },
  iconText: {
    fontSize: 20,
    fontWeight: '600',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pinnedNotification: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderLeftWidth: 4,
    borderLeftColor: '#228BE6',
  },
  pinnedBadge: {
    backgroundColor: '#E7F5FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  pinnedText: {
    color: '#228BE6',
    fontSize: 13,
    fontWeight: '600',
  },
  notificationType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    fontSize: 13,
    color: '#6C757D',
    marginTop: 2,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gameName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 2,
    lineHeight: 18,
  },
  pendingNotificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0,
  },
  pendingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: '#E8F0FE',
  },
  pendingPinnedBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pendingPinnedText: {
    color: '#FF9800',
  },
  pendingGameName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 4,
  },
  pendingMessage: {
    fontSize: 14,
    color: '#37474F',
    lineHeight: 20,
    marginBottom: 4,
  },
  pendingDate: {
    fontSize: 13,
    color: '#78909C',
    marginTop: 4,
  },
  gameNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamepadIcon: {
    marginRight: 4,
  },
  controllerIcon: {
    width: '60%',
    height: '60%',
    tintColor: '#212529',
  },
});

export default NotificationScreen; 