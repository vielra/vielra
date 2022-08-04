import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Constants
import { RoutesConstant } from '@/constants';

// Screens and Stacks
import { AuthStackNavigator } from '@/modules/auth/navigators';
import { WelcomeScreen } from '@/screens';

// Interface
export interface IRootStackParamList extends Record<string, object | undefined> {
  AuthStack: undefined;
  WelcomeScreen: undefined;
}

// Root Stack
const RootStack = createNativeStackNavigator<IRootStackParamList>();

export const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={RoutesConstant.WelcomeScreen} component={WelcomeScreen} />
      <RootStack.Screen name={RoutesConstant.Auth.AuthStack} component={AuthStackNavigator} />
    </RootStack.Navigator>
  );
};
