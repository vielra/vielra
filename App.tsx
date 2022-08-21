import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

// Gesture Handler Root View.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// React Native Screens.
import { enableScreens } from 'react-native-screens';

// Providers.
import { ReduxProvider, ThemeProvider, NavigationProvider, SafeAreaProvider } from '@/components/providers';

// RootStack navigator.
import { RootStackNavigator } from '@/navigators';

// Bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Components.
import { Toast } from '@/components/core/toast';
import { BottomSheetWarningAuthRequired, StatusBar } from '@/components/shared';

// CodePush
import CodePush, { CodePushOptions } from 'react-native-code-push';

// i18n
import '@/config/i18n.config';

enableScreens();

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    appendReleaseDescription: true,
  },
};

const App: FC = () => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <NavigationProvider>
          <GestureHandlerRootView style={styles.root}>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <StatusBar translucent backgroundColor="transparent" />
                <RootStackNavigator />
                <Toast />
                <BottomSheetWarningAuthRequired />
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </NavigationProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default CodePush(codePushOptions)(App);
