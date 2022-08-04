import React, { FC, PropsWithChildren, ReactNode } from 'react';

// Navigation container.
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store';
import { theme_rootSelector } from '@/modules/theme/redux';

export const NavigationProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => {
  const { mode } = useAppSelector((s) => theme_rootSelector(s));
  return <NavigationContainer theme={mode === 'dark' ? DarkTheme : DefaultTheme}>{children}</NavigationContainer>;
};
