import {Button, SafeAreaView, View} from 'react-native';
import requireAuth from '../../hoc/requiredAuth';
import useAuth from '../../hooks/useAuth';
import {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logout} from '../../redux/user/auth.slice';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import SubscribeTab from './SubscribeTab';
import {Colors} from '../../config/colors';

const HomePage: React.FC<{navigation: NavigationProp<any>}> = ({}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {isLoggedIn} = useAppSelector(state => state.auth);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigation.navigate('login' as never);
  //   } else {
  //     console.log(navigation.getState);
  //   }
  // }, [isLoggedIn]);

  const tabOption: MaterialTopTabNavigationOptions = {
    tabBarLabelStyle: {
      textTransform: 'capitalize',
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1.1,
    },
  };
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator style={{paddingTop: 40}}>
      <Tab.Screen
        name="Dành cho bạn"
        component={ForYouTab}
        options={tabOption}
      />
      <Tab.Screen
        name="Đang theo dõi"
        component={SubscribeTab}
        options={tabOption}
      />
    </Tab.Navigator>
  );
};

export default HomePage;
