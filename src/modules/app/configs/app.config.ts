// import Config from 'react-native-config';
import { API_BASE_URL } from '@env';
import { uiConfig } from './ui.config';

export const appConfig = {
  appName: 'Vielra',
  appDescription: 'Speak vietnamese with confidence',
  defaultVectorIcon: 'ionicons',
  defaultLang: 'en',
  apiBaseUrl: API_BASE_URL,
  defaultPaletteMode: 'light', // 'light' | 'dark'
  ...uiConfig,
};
