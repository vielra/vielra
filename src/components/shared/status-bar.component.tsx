import React, { FC } from 'react';
import { useTheme } from '@/modules/theme/hooks';
import { StatusBar as ReactNativeStatusBar, StatusBarProps } from 'react-native';

// import { useIsFocused } from '@react-navigation/native';

export const StatusBar: FC<StatusBarProps> = (props: StatusBarProps) => {
  const { palette } = useTheme();
  return <ReactNativeStatusBar barStyle={palette.mode === 'dark' ? 'light-content' : 'dark-content'} {...props} />;
};
