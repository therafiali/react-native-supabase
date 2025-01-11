import React from 'react';
import { View, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import GameActionScreen from '../screens/GameActionScreen';
import LiveChatScreen from '../screens/LiveChatScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const ICONS = {
  home: 'https://img.icons8.com/?size=50&id=73&format=png',
  games: 'https://img.icons8.com/?size=50&id=51F0o6bWwYMt&format=png',
  recharge: 'https://img.icons8.com/?size=50&id=78231&format=png',
  chat: 'https://img.icons8.com/?size=50&id=3726&format=png',
  notifications: 'https://img.icons8.com/?size=50&id=11642&format=png',
};


const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Image 
                source={{ uri: ICONS.home }}
                style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={GameScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Image 
                source={{ uri: ICONS.games }}
                style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="GameAction"
        component={GameActionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Image 
                source={{ uri: ICONS.recharge }}
                style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LiveChat"
        component={LiveChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Image 
                source={{ uri: ICONS.chat }}
                style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Image 
                source={{ uri: ICONS.notifications }}
                style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
    backgroundColor: '#0066FF',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    paddingBottom: 0,
    borderTopWidth: 0,
    paddingHorizontal: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minWidth: 50,
    marginHorizontal: 2,
    paddingTop: 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  tabItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 0,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    marginBottom: 0,
  },
});

export default BottomTabs; 