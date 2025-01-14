import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import GameActionScreen from '../screens/GameActionScreen';
import LiveChatScreen from '../screens/LiveChatScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Icon 
                name="home"
                size={24}
                color={focused ? '#000000' : '#757575'}
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
              <Icon 
                name="apps"
                size={24}
                color={focused ? '#000000' : '#757575'}
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
              <Icon 
                name="currency-usd"
                size={24}
                color={focused ? '#000000' : '#757575'}
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
              <Icon 
                name="chat"
                size={24}
                color={focused ? '#000000' : '#757575'}
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
              <Icon 
                name="clock"
                size={24}
                color={focused ? '#000000' : '#757575'}
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
    left: 0,
    right: 0,
    bottom: 0,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    height: '100%',
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#000000',
  },
});

export default BottomTabs; 