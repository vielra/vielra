import { FC } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';

// components
import { Typography } from '@/components/core';

// config
import { appConfig } from '@/modules/app/configs';
import { themeConfig } from '@/modules/theme/configs';

// utils
import { screenUtils } from '@/modules/app/utilities';
import { createSpacing } from '@/modules/theme/utilities';

// assets
import { Assets } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  isLoading?: boolean;
}

const Splash: FC<Props> = ({ isLoading }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={styles.root}>
        <Image source={Assets.logoPrimary} style={styles.logo} resizeMode='contain' />
        <Typography variant='h2' color='text.secondary' fontWeight='bold'>
          {appConfig.appName}
        </Typography>
        <View style={styles.loadingSpace}>
          {isLoading && <ActivityIndicator color={themeConfig.paletteBase.secondary.main} size={28} />}
        </View>
      </View>
      <View style={StyleSheet.flatten([styles.footer, { marginBottom: insets.bottom + 32 }])}>
        <Typography color='text.secondary' gutterBottom={2}>
          {appConfig.appDescription}
        </Typography>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: screenUtils.width,
    height: screenUtils.height,
    zIndex: 1000,
  },
  logo: {
    height: 108,
    marginBottom: createSpacing(5),
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  loadingSpace: {
    marginTop: 12,
    height: 30,
  },
});

export default Splash;
