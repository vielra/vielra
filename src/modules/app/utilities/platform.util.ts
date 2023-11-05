import { Platform } from 'react-native';

export const isIOS: boolean = Platform.OS === 'ios';

export const isAndroid: boolean = Platform.OS === 'android';

export const platformUtils = {
  isIOS,
  isAndroid,
};
