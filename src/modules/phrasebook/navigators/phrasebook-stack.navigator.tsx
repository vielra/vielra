import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { PhraseCategoryScreen, PhraseListScreen } from '../screens';

// Constants
import { RoutesConstant } from '@/constants';
import { IPhraseCategory } from '../interfaces';
// import { useTheme } from '@/modules/theme/hooks';

export interface IPhrasebookStackParamList extends Record<string, object | undefined> {
  PhraseCategoryScreen: undefined;
  PhraseListScreen: { category: IPhraseCategory };
}

// Auth Stack
const PhrasebookStack = createNativeStackNavigator<IPhrasebookStackParamList>();

export const PhrasebookStackNavigator: FC = () => {
  return (
    <PhrasebookStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesConstant.PhrasebookStack.PhraseCategoryScreen}>
      <PhrasebookStack.Screen
        name={RoutesConstant.PhrasebookStack.PhraseCategoryScreen}
        component={PhraseCategoryScreen}
      />
      <PhrasebookStack.Screen
        options={{
          animation: 'slide_from_right',
        }}
        name={RoutesConstant.PhrasebookStack.PhraseListScreen}
        component={PhraseListScreen}
      />
    </PhrasebookStack.Navigator>
  );
};
