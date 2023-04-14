import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/home/HomePage';
import SearchPage from '../../screens/search/SearchPage';
import NotificationPage from '../../screens/notification/NotificationPage';
import ChatPage from '../../screens/chat/ChatPage';
import HomeIcon from '../../assets/svg/home.svg';
import HomeActiveIcon from '../../assets/svg/homeActive.svg';
import SearchIcon from '../../assets/svg/explore.svg';
import SearchActiveIcon from '../../assets/svg/exploreActive.svg';
import NotificationIcon from '../../assets/svg/notification.svg';
import NotificationActiveIcon from '../../assets/svg/notificationActive.svg';
import ChatIcon from '../../assets/svg/message.svg';
import ChatActiveIcon from '../../assets/svg/messageActive.svg';

const Tab = createBottomTabNavigator();
const tabBarOption = (
  icon: React.ReactNode,
  activeIcon: React.ReactNode,
  header?: React.ReactNode,
): BottomTabNavigationOptions => {
  return {
    headerShown: false,
    tabBarShowLabel: false,
    header: header
      ? () => {
          return header;
        }
      : undefined,
    tabBarIcon: ({focused}) => {
      return focused ? activeIcon : icon;
    },
    tabBarIconStyle: {width: 20},
  };
};
export default function TabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomePage}
        options={tabBarOption(<HomeIcon />, <HomeActiveIcon />)}
      />
      <Tab.Screen
        name="search"
        component={SearchPage}
        options={tabBarOption(<SearchIcon />, <SearchActiveIcon />)}
      />
      <Tab.Screen
        name="notification"
        component={NotificationPage}
        options={tabBarOption(<NotificationIcon />, <NotificationActiveIcon />)}
      />
      <Tab.Screen
        name="chat"
        component={ChatPage}
        options={tabBarOption(<ChatIcon />, <ChatActiveIcon />)}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
