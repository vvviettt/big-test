/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import TabBar from './src/components/TabBar/TabBar';
import {Colors} from './src/config/colors';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, background: Colors.white},
          }}>
          <TabBar />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
