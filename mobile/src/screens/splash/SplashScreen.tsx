import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';
import splash from '../../assets/json/splash.json';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {getUerInformation} from '../../redux/user/user.slice';

const SplashScreen = () => {
  const {user} = useAppSelector(state => state.user);
  const navigate = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(getUerInformation());
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
        <Lottie
          style={{
            width: 800,
            height: 400,
          }}
          source={splash}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
