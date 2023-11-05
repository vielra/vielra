import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { platformUtils } from './platform.util';

export const changeNavbarBarColor = (color: string, light?: boolean, animated?: boolean): void => {
  if (platformUtils.isAndroid) {
    try {
      changeNavigationBarColor(color, light, animated);
    } catch (e) {}
  }
};

export const uiUtils = {
  changeNavbarBarColor,
};
