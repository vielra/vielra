import { View, StyleSheet } from 'react-native';

// Utils
// import { createSpacing } from '@/modules/theme/utilities';

import { Button, Screen, Typography } from '@/components/core';

// Hooks
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Interfaces
import { NavigationProps } from '@/navigators';
import { HomeHeaderVariant1, HomeHeaderVariant2 } from '@/modules/dashboard/components';
import { HomeConfig } from '@/modules/dashboard/configs';

// utils / helpers
import { createSpacing } from '@/modules/theme/utilities';

import { storageUtils } from '@/modules/app/utilities';

const DashboardScreen = () => {
  const theme = useTheme();
  const { theme_togglePaletteMode } = useTheme();
  const navigation = useNavigation<NavigationProps>();

  const onClearStorage = () => {
    storageUtils.clear();
  };

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}>
      {HomeConfig.HeaderVariant === 'variant1' ? <HomeHeaderVariant1 /> : <HomeHeaderVariant2 />}

      <View
        style={{
          marginBottom: createSpacing(4),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.05,
          shadowRadius: 6,
        }}>
        <View
          style={{
            height: 150,
            width: 150,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.paper,
          }}>
          <Typography>Card with Shadow</Typography>
        </View>
      </View>

      <View style={{ marginHorizontal: createSpacing(6) }}>
        <Button
          onPress={() => navigation.navigate('login_screen')}
          title='Navigate to Login'
          startIcon='log-in'
          iconType='ionicons'
          color='secondary'
          variant='outlined'
          style={{ marginBottom: createSpacing(2), borderRadius: 40 }}
        />

        <Button
          onPress={() => navigation.navigate('settings_screen')}
          title='Go to settings'
          startIcon='settings'
          iconType='ionicons'
          color='secondary'
          variant='text'
          style={{ marginBottom: createSpacing(2), borderRadius: 40 }}
        />

        <Button
          color='secondary'
          onPress={() => theme_togglePaletteMode()}
          title='Toggle Theme'
          size='small'
          startIcon='moon'
          iconType='ionicons'
          style={{ marginBottom: createSpacing(2) }}
        />
        <Button title='Clear Storage' onPress={onClearStorage} />
      </View>
    </Screen>
  );
};

export default DashboardScreen;
