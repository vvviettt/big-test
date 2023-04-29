import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
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
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Colors} from '../../config/colors';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/LoginScreen/LoginScreen';
import ChooseOptionAuthScreen from '../../screens/auth/ChooseOptionAuthScreen/ChooseOptionAuthScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen/RegisterScreen';
import SplashScreen from '../../screens/splash/SplashScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AddPostScreen from '../../screens/new_post/NewPostScreen';
import {Socket, io} from 'socket.io-client';
import {ConstantVariable} from '../../config/constant';
import {initSocket} from '../../redux/chat/chat.slice';
import ChatRoomPage from '../../screens/chat/ChatRoomPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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

export default function Navigator() {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket: Socket = io(ConstantVariable.ChatSocket);
    socket.on('connect_success', () => {
      dispatch(initSocket(socket));
    });
    socket.on('connect_error', error => {});
  }, []);
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: Colors.white},
      }}>
      {isLoggedIn ? (
        <BottomSheetModalProvider>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="splash">
            <Stack.Screen name="content" component={TabView} />
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="new_post" component={AddPostScreen} />
            <Stack.Screen name="chat_room" component={ChatRoomPage} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="ChooseAuth">
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="ChooseAuth" component={ChooseOptionAuthScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function TabView() {
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
