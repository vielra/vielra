import { useCallback } from 'react';
import { View } from 'react-native';

// components
import { Button, Screen, Typography } from '@/components/core';

// hooks
import { useApp } from '@/modules/app/hooks';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// utils
import { storageUtils } from '@/modules/app/utilities';

// interfaces
import { NavigationProps } from '@/navigators';
import { useAppDispatch } from '@/plugins/redux';

const OnboardingScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const nav = useNavigation<NavigationProps>();
  const { app_setAlreadyLaunched, app_togglePaletteMode } = useApp();

  const onPressFinish = useCallback(() => {
    app_setAlreadyLaunched(true);
    storageUtils.save('IS_ALREADY_LAUNCHED', true);
    nav.replace('bottom_tab_stack');
  }, []);

  const onToggleTheme = () => {
    dispatch(app_togglePaletteMode());
  };

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography color='text.disabled' style={{ textAlign: 'center' }} gutterBottom={2}>
          Onboarding Screen
        </Typography>
        <Button title='Finish onboarding' onPress={onPressFinish} style={{ marginBottom: 20 }} />
        <Button title='Toggle Theme' onPress={onToggleTheme} variant='contained' />
      </View>
    </Screen>
  );
};

export default OnboardingScreen;
