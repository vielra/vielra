import React, { FC } from 'react';
import { WelcomeScreen, RegisterScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

export const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    </RootStack.Navigator>
  );
};
