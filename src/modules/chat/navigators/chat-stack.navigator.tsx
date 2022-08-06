import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { ChatScreen } from '@/modules/chat/screens';

// Constants
import { RoutesConstant } from '@/constants';

export interface IChatStackParamList extends Record<string, object | undefined> {
  LoginScreen: undefined;
  RegisterScreen: undefined;
}

// Auth Stack
const ChatStack = createNativeStackNavigator<IChatStackParamList>();

export const ChatStackNavigator: FC = () => {
  return (
    <>
      <ChatStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={RoutesConstant.ChatStack.ChatScreen}>
        <ChatStack.Screen name={RoutesConstant.ChatStack.ChatScreen} component={ChatScreen} />
      </ChatStack.Navigator>
    </>
  );
};
