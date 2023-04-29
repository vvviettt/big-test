/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store, {persistor, useAppDispatch} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Navigator from './src/components/TabBar/TabBar';
import {Colors} from './src/config/colors';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <SafeAreaProvider>
        <Navigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
