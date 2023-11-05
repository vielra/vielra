import { StyleSheet } from 'react-native';

// Gesture Handler Root View.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// React Native Screens.
import { enableScreens } from 'react-native-screens';

// Bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Components.
import { SafeAreaProvider } from 'react-native-safe-area-context';

// CodePush
import CodePush, { CodePushOptions } from 'react-native-code-push';

// app container
import AppContainer from './app.container';

// i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// configs
import { appConfig } from '@/modules/app/configs';
import { ReduxProvider } from './plugins/redux';

// i18n config
import { i18nConfig } from './plugins/i18n';
import { ThemeContextProvider } from './modules/theme/contexts';

enableScreens();

i18n.use(initReactI18next).init({
  resources: i18nConfig.translations,
  fallbackLng: appConfig.defaultLang,
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'id', 'vi'],
  compatibilityJSON: 'v3',
});

const App = (): JSX.Element => {
  return (
    <ReduxProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView style={styles.root}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <AppContainer />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    appendReleaseDescription: true,
  },
};

// export default CodePush(codePushOptions)(App);
export default App;
