import React, { FC } from 'react';
import { AuthStackNavigator } from '@/modules/auth';
import { WelcomeScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Register" component={AuthStackNavigator} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
