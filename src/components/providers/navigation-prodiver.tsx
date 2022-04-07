import React, { FC, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';

interface Props {
  children: ReactNode;
}

const NavigationProvider: FC<Props> = ({ children }: Props) => <NavigationContainer>{children}</NavigationContainer>;

export default NavigationProvider;
