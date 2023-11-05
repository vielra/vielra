import DeviceInfo from 'react-native-device-info';

export const isTablet: boolean = DeviceInfo.isTablet();

export const deviceUtils = {
  isTablet,
};
