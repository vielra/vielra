import React, { FC, useEffect } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Constants
import { RoutesConstant } from '@/constants';

// Screens and Stacks
import { BottomTabNavigator } from './bottom-tab.navigator';
import { AuthStackNavigator } from '@/modules/auth/navigators';
import { SettingScreen } from '@/modules/settings/screens';
import { AddPhraseScreen } from '@/modules/phrasebook';

// Hooks
// import { useAuth } from '@/modules/auth/hooks';
import { useLocalization } from '@/modules/localization';

// Interface
export interface IRootStackParamList extends Record<string, object | undefined> {
  AuthStack: undefined;
  WelcomeScreen: undefined;
}

import i18n from '@/config/i18n.config';

// Root Stack
const RootStack = createNativeStackNavigator<IRootStackParamList>();

export const RootStackNavigator: FC = () => {
  const { language } = useLocalization();

  useEffect(() => {
    if (language.code !== i18n.language) {
      i18n.changeLanguage(language.code);
    }
  }, [language.code]);

  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={RoutesConstant.RootStack.BottomTabStack} component={BottomTabNavigator} />
        <RootStack.Screen name={RoutesConstant.RootStack.AuthStack} component={AuthStackNavigator} />
        <RootStack.Screen name={RoutesConstant.RootStack.SettingsScreen} component={SettingScreen} />
        <RootStack.Screen name={RoutesConstant.RootStack.AddPhraseScreen} component={AddPhraseScreen} />
      </RootStack.Navigator>
    </>
  );
};
