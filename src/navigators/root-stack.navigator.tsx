import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Constants
import { RoutesConstant } from '@/constants';

// Screens and Stacks
import { BottomTabNavigator } from './bottom-tab.navigator';
import { AuthStackNavigator } from '@/modules/auth/navigators';
import { SettingScreen } from '@/modules/settings/screens';

// Hooks
// import { useAuth } from '@/modules/auth/hooks';

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
      <RootStack.Screen name={RoutesConstant.RootStack.BottomTabStack} component={BottomTabNavigator} />
      <RootStack.Screen name={RoutesConstant.RootStack.AuthStack} component={AuthStackNavigator} />
      <RootStack.Screen name={RoutesConstant.RootStack.SettingsScreen} component={SettingScreen} />
    </RootStack.Navigator>
  );
};
