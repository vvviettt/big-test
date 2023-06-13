import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import splash from '../../assets/json/splash.json';

import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getUserInfo} from '../../redux/user/userSlice';

const SplashScreen = () => {
  const {user} = useAppSelector(state => state.user);
  const navigate = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo());
    }
  }, []);
  useEffect(() => {
    if (user) {
      navigate.navigate('content' as never);
    }
  }, [user]);
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        {/* <Lottie
          style={{
            width: 800,
            height: 400,
          }}
          source={splash}
          autoPlay
          loop
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
