import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({ profileImageSize: 512 });

AppRegistry.registerComponent(appName, () => App);
