import React, { FC } from 'react';
import { NavigationProvider, SafeAreaProvider, StateProvider } from '@/components/providers';
import { RootStackNavigator } from '@/navigations';

const App: FC = () => {
  return (
    <StateProvider>
      <NavigationProvider>
        <SafeAreaProvider>
          <RootStackNavigator />
        </SafeAreaProvider>
      </NavigationProvider>
    </StateProvider>
  );
};

export default App;
