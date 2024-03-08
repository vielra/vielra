import { ComponentType } from 'react';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';

export type NavigatorParamList = {
  splash_screen: undefined;
  onboarding_screen: undefined;
  bottom_tab_stack: undefined;
  register_screen: undefined;
  login_screen: undefined;
  settings_screen: undefined;
  phrase_list_screen: {
    category: IPhraseCategory;
  };
  phrase_favorite_screen: undefined;
  add_phrase_screen: {
    category?: IPhraseCategory | null;
  };
} & BottomTabNavigatorParamList;

export type BottomTabNavigatorParamList = {
  dashboard_screen: undefined;
  phrase_category_screen: undefined;
  chat_screen: undefined;
  profile_screen: undefined;
};

export type ScreenType = {
  label?: string | null;
  name: keyof Partial<NavigatorParamList>;
  component: ComponentType<object> | (() => JSX.Element);
  options?: NativeStackNavigationOptions;
};

export type NavigationProps = NativeStackNavigationProp<Partial<NavigatorParamList>>;

export type AppStackScreenProps<T extends keyof NavigatorParamList> = NativeStackScreenProps<NavigatorParamList, T>;
