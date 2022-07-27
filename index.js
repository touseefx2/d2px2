import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import store from './src/store/index';
configure({useProxies: 'never'});
LogBox.ignoreAllLogs(true);

function MainApp() {
  return (
    <Provider {...store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
