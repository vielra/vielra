import { useEffect, useRef, useState } from 'react';

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// interfaces
import { NavigatorParamList, ScreenType } from './navigation.type';
import { AppState, AppStateStatus } from 'react-native';
import { AppLanguageCode } from '@/modules/app/interfaces';

// screens & navigator
// import { SplashScreen } from '@/screens/splash';

// navigator

// screens
// import { LayoutDetailScreen } from '@/screens/layout';
// import { OnboardingScreen } from '@/screens/onboarding';

// hooks
import { useTranslation } from 'react-i18next';
import { useApp, useToast } from '@/modules/app/hooks';

// helpers / utils
import { authUtils } from '@/modules/auth/utilities';
import { storageUtils } from '@/modules/app/utilities';

import { useAuth } from '@/modules/auth/hooks';
import { log } from '@/modules/common/helpers';

// screens & navigators
import BottomTabStackNavigator from './bottom-tab-stack.navigator';
import { OnboardingScreen, SplashScreen } from '@/modules/app/screens';
import { Splash } from '@/modules/app/components/splash';
import { RegisterScreen, LoginScreen } from '@/modules/auth/screens';

// api
import { useAppDispatch } from '@/plugins/redux';
import { SettingsScreen } from '@/modules/settings/screens';
import { AddPhraseScreen, PhraseFavoriteScreen, PhraseListScreen } from '@/modules/phrasebook/screens';

const SCREENS: Array<ScreenType> = [
  { name: 'splash_screen', component: SplashScreen },
  { name: 'onboarding_screen', component: OnboardingScreen },
  { name: 'bottom_tab_stack', component: BottomTabStackNavigator },
  { name: 'settings_screen', component: SettingsScreen },
  { name: 'register_screen', component: RegisterScreen },
  { name: 'login_screen', component: LoginScreen },
  { name: 'phrase_list_screen', component: PhraseListScreen as () => JSX.Element },
  { name: 'phrase_favorite_screen', component: PhraseFavoriteScreen as () => JSX.Element },
  { name: 'add_phrase_screen', component: AddPhraseScreen },
];

const RootStack = createNativeStackNavigator<NavigatorParamList>();

const RootStackNavigator = (): JSX.Element | null => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { showToast } = useToast();
  const { persistedAuth_setUser, auth_reset, auth_getUser } = useAuth();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [_, setAppStateVisible] = useState(appState.current);
  const { app_setLanguage, alreadyLaunched, app_setAlreadyLaunched, app_checkServerStatus } = useApp();

  /**
   * check already launched
   */
  const checkIsAlreadyLaunched = async (): Promise<void> => {
    const value = await storageUtils.get('IS_ALREADY_LAUNCHED');
    dispatch(app_setAlreadyLaunched(Boolean(value) ?? false));
  };

  /**
   * check app language
   */
  const checkAppLanguage = async (): Promise<void> => {
    const savedLanguageCode = storageUtils.getString('LANGUAGE');
    if (savedLanguageCode && i18n.language !== savedLanguageCode) {
      dispatch(app_setLanguage(savedLanguageCode as AppLanguageCode));
    }
  };

  /**
   * check server status
   */
  const checkServerStatus = async (): Promise<void> => {
    if (__DEV__) {
      return Promise.resolve();
    }
    try {
      const response = await app_checkServerStatus(undefined);
      if (response.isError) {
        showToast({
          position: 'bottom',
          variant: 'filled',
          type: 'error',
          text1: 'Server unavailable',
        });
      }
    } catch (e) {
      showToast({
        position: 'bottom',
        variant: 'filled',
        type: 'error',
        text1: 'Something when wrong',
      });
      log.info(JSON.stringify(e));
    }
  };

  /**
   * check authenticated user
   */
  const checkAuthenticatedUser = async (): Promise<void> => {
    if (__DEV__) {
      return Promise.resolve();
    }
    const sanctumToken = authUtils.getToken();
    try {
      if (sanctumToken) {
        const response = await auth_getUser(sanctumToken);
        if (response?.isSuccess) {
          dispatch(persistedAuth_setUser(response.data));
        }
      } else {
        auth_reset();
      }
    } catch (e) {
      auth_reset();
    }
  };

  const initApp = async (): Promise<void> => {
    await checkServerStatus();
    await checkAppLanguage();
    await checkIsAlreadyLaunched();
    await checkAuthenticatedUser();
  };

  useEffect(() => {
    (async () => {
      initApp()
        .then()
        .catch((reason) => {
          log.info(`initApp error  -> ${JSON.stringify(reason)}`);
        })
        .finally(() => {
          setIsAppLoaded(true);
        });
    })();

    // ! check appstate, and run function in case user change permmission
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        // appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        //  do something
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  if (!isAppLoaded) {
    return <Splash isLoading={true} />;
  }

  return (
    <RootStack.Navigator
      initialRouteName={alreadyLaunched ? 'bottom_tab_stack' : 'onboarding_screen'}
      screenOptions={{ headerShown: false }}>
      {SCREENS.map((x) => {
        return <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />;
      })}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
