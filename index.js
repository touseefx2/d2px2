import React from 'react';
import {AppRegistry, LogBox, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import theme from './src/theme/index';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import store from './src/store/index';
configure({useProxies: 'never'});
LogBox.ignoreAllLogs(true);
// StatusBar.setBackgroundColor(theme.color.button1);
// StatusBar.setBarStyle('dark-content', false);

function MainApp() {
  return (
    <Provider {...store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
