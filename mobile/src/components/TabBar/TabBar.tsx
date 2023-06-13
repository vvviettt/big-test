import React, {useEffect} from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/home/HomePage';
import SearchPage from '../../screens/search/SearchPage';
import NotificationPage from '../../screens/notification/NotificationPage';
import ProfilePage from '../../screens/profile/ProfilePage';
import HomeIcon from '../../assets/svg/home.svg';
import HomeActiveIcon from '../../assets/svg/homeActive.svg';
import SearchIcon from '../../assets/svg/explore.svg';
import SearchActiveIcon from '../../assets/svg/exploreActive.svg';
import NotificationIcon from '../../assets/svg/notification.svg';
import NotificationActiveIcon from '../../assets/svg/notificationActive.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import ProfileActiveIcon from '../../assets/svg/profileActive.svg';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Colors} from '../../config/colors';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/LoginScreen/LoginScreen';
import ChooseOptionAuthScreen from '../../screens/auth/ChooseOptionAuthScreen/ChooseOptionAuthScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen/RegisterScreen';
import SplashScreen from '../../screens/splash/SplashScreen';
import AddPostScreen from '../../screens/new_post/NewPostScreen';
import ChatRoomPage from '../../screens/profile/ChatRoomPage';
import {getUserInfo} from '../../redux/user/userSlice';

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
  const {isLoggedIn} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: Colors.white},
      }}>
      {isLoggedIn ? (
        // <BottomSheetModalProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="splash">
          <Stack.Screen name="content" component={TabView} />
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="new_post" component={AddPostScreen} />
          <Stack.Screen name="chat_room" component={ChatRoomPage} />
        </Stack.Navigator>
      ) : (
        // </BottomSheetModalProvider>
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
      {/* <Tab.Screen
        name="search"
        component={SearchPage}
        options={tabBarOption(<SearchIcon />, <SearchActiveIcon />)}
      /> */}
      <Tab.Screen
        name="notification"
        component={NotificationPage}
        options={tabBarOption(<NotificationIcon />, <NotificationActiveIcon />)}
      />
      <Tab.Screen
        name="profile"
        component={ProfilePage}
        options={tabBarOption(<ProfileIcon />, <ProfileActiveIcon />)}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({});
