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
  const { palette } = useTheme();
  return (
    <>
      <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={RoutesConstant.Auth.RegisterScreen}>
        <AuthStack.Screen name={RoutesConstant.Auth.LoginScreen} component={LoginScreen} />
        <AuthStack.Screen name={RoutesConstant.Auth.RegisterScreen} component={RegisterScreen} />
      </AuthStack.Navigator>
    </>
  );
};
