import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { LoginScreen, RegisterScreen } from '@/modules/auth/screens';

// Constants
import { RoutesConstant } from '@/constants';
import { useTheme } from '@/modules/theme/hooks';

export interface IAuthStackParamList extends Record<string, object | undefined> {
  LoginScreen: undefined;
  RegisterScreen: undefined;
}

// Auth Stack
const AuthStack = createNativeStackNavigator<IAuthStackParamList>();

export const AuthStackNavigator: FC = () => {
  return (
    <>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={RoutesConstant.AuthStack.RegisterScreen}>
        <AuthStack.Screen name={RoutesConstant.AuthStack.LoginScreen} component={LoginScreen} />
        <AuthStack.Screen name={RoutesConstant.AuthStack.RegisterScreen} component={RegisterScreen} />
      </AuthStack.Navigator>
    </>
  );
};
