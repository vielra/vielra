import React, { FC } from 'react';

// Providers.
import { ReduxProvider, ThemeProvider, NavigationProvider, SafeAreaProvider } from '@/providers';

// RootStack navigator.
import { RootStackNavigator } from '@/navigators';

const App: FC = () => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <NavigationProvider>
          <SafeAreaProvider>
            <RootStackNavigator />
          </SafeAreaProvider>
        </NavigationProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
