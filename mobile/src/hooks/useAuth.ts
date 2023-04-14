import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/store';

const useAuth = (auth: boolean) => {
  const navigation = useNavigation();
  const {isLoggedIn} = useAppSelector(state => state.auth);
  useEffect(() => {
    console.log('chang');

    if (!isLoggedIn && !auth) {
      navigation.navigate('login' as never);
    } else {
      console.log(navigation.getState);
    }
  }, [isLoggedIn]);
};

export default useAuth;
