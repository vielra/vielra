import { WelcomeScreen, RegisterScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

const RootStack = createNativeStackNavigator();

const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
