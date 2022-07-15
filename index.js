import {AppRegistry, LogBox, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import theme from './src/theme/index';
import {configure} from 'mobx';

configure({useProxies: 'never'});

LogBox.ignoreAllLogs(true);
// StatusBar.setBackgroundColor(theme.color.button1);
// StatusBar.setBarStyle('dark-content', false);

AppRegistry.registerComponent(appName, () => App);
