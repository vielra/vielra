/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

// Google Signin
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({ profileImageSize: 512 });

AppRegistry.registerComponent(appName, () => App);
