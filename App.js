import React, {useEffect} from 'react';
import {AppState, Alert} from 'react-native';
import stack from './src/navigation/index';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalFont from 'react-native-global-font';
import theme from './src/theme';
import screens from './src/screens/index';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import store from './src/store/index';
import {observer} from 'mobx-react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default observer(App);
function App(props) {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    GlobalFont.applyGlobal(theme.fonts.fontNormal);
    const unsubscribeNetinfo = NetInfo.addEventListener(state => {
      store.General.setInternet(state.isConnected);
    });
    const unsubscribeAppState = AppState.addEventListener(
      'change',
      appState => {
        store.General.setappState(appState);
        if (appState === 'active') {
          NetInfo.fetch().then(state => {
            store.General.setInternet(state.isConnected ? true : false);
          });
        }
      },
    );
    store.General.setapiLevel(DeviceInfo.getApiLevel());
    store.General.setappBuildNumber(DeviceInfo.getBuildNumber());
    store.General.setappVersionNumber(DeviceInfo.getVersion());
    return () => {
      unsubscribeNetinfo();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {store.General.Loading && (
            <Stack.Screen name="Splash" component={screens.Splash} />
          )}

          {!store.General.Loading && (
            <Stack.Screen name="HomeStack" component={stack.HomeStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
