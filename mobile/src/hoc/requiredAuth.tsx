import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {View} from 'react-native';
import useAuth from '../hooks/useAuth';

const requireAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const HOC = (props: P) => {
    useAuth(false);
    return <WrappedComponent {...props} />;
  };
  return HOC;
};

export default requireAuth;
