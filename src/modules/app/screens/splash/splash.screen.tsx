import { FC, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// components
import { Screen } from '@/components/core';

// components
import { Splash } from '@/modules/app/components';

// utils
import { uiUtils } from '@/modules/app/utilities';

// hooks
import { useTheme } from '@/modules/theme/hooks';

const SplashScreen: FC = () => {
  const theme = useTheme();
  useFocusEffect(
    useCallback(() => {
      uiUtils.changeNavbarBarColor(theme.palette.background.paper, true, false);
    }, [theme.palette.mode]),
  );
  return (
    <Screen preset='fixed' statusBarStyle='light-content' backgroundColor={theme.palette.background.paper}>
      <Splash />
    </Screen>
  );
};

export default SplashScreen;
