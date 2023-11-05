// navigation container
import NavigationContainer from '@/navigators/navigation.container';

// components
import { StatusBar } from '@/components/core';

// hooks
import { useTheme } from '@/modules/theme/hooks';

// config
import { toastConfig } from './modules/app/configs';

// toast
import Toast, { ToastConfig } from 'react-native-toast-message';

// utils
import { uiUtils } from '@/modules/app/utilities';

const AppContainer = (): JSX.Element => {
  const { palette } = useTheme();

  const onNavigationIsReady = (): void => {
    uiUtils.changeNavbarBarColor(palette.background.paper, false, false);
  };

  return (
    <>
      <StatusBar translucent backgroundColor='transparent' />
      <NavigationContainer onReady={onNavigationIsReady} />
      <Toast position='bottom' config={toastConfig as ToastConfig} />
    </>
  );
};

export default AppContainer;
