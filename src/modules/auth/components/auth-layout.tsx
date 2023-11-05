import React, { FC, PropsWithChildren, useMemo, useCallback } from 'react';

import { StyleSheet, ImageBackground, ScrollView, View, TouchableOpacity } from 'react-native';

// components
import { Typography } from '@/components/core';
import { IconButton } from '@/components/core/icon-button';
import { SafeAreaView } from 'react-native-safe-area-context';

// hooks.
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';

// utils
import { isTablet } from 'react-native-device-info';
import { screenUtils } from '@/modules/app/utilities';
import { createSpacing } from '@/modules/theme/utilities';

// interfaces
import { NavigationProps } from '@/navigators';

// assets
import { Assets } from '@/assets';

const { width, height } = screenUtils;

// Dynamic layout background image.
const LayoutBackground: FC<{ isDark: boolean }> = ({ isDark }) => {
  if (isTablet()) {
    return (
      <ImageBackground
        source={isDark ? Assets.wavyBackgroundLandScapeDark : Assets.wavyBackgroundLandScape}
        imageStyle={{ resizeMode: 'cover' }}
        style={[StyleSheet.absoluteFill, { width, height }]}
      />
    );
  } else {
    return (
      <ImageBackground
        source={isDark ? Assets.wavyBackgroundPortraitDark : Assets.wavyBackgroundPortrait}
        imageStyle={{ resizeMode: 'cover' }}
        style={[StyleSheet.absoluteFill, { width, height }]}
      />
    );
  }
};

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const { theme_togglePaletteMode, isDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  /** is register page */
  const isRegisterScreen = useMemo<boolean>(() => {
    return route.name === 'register_screen';
  }, [route.name]);

  const handleToggleThemeMode = useCallback(() => {
    theme_togglePaletteMode();
  }, [isDarkMode]);

  return (
    <>
      <LayoutBackground isDark={theme.isDarkMode} />
      <SafeAreaView style={StyleSheet.flatten([styles.root])}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.scrollView_contentContainerStyle}>
          {children}
        </ScrollView>
        <View style={StyleSheet.flatten([styles.footer, { backgroundColor: theme.palette.background.paper }])}>
          <View style={styles.formLink}>
            <Typography color='text.secondary' style={{ marginRight: createSpacing(1) }}>
              {isRegisterScreen ? 'Already have an account ?' : "Don't have an account ?"}
            </Typography>
            <TouchableOpacity
              onPress={() => navigation.navigate(isRegisterScreen ? 'login_screen' : 'register_screen')}>
              <Typography style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                {isRegisterScreen ? 'Login' : 'Register'}
              </Typography>
            </TouchableOpacity>
          </View>
          {/* display only large screen */}
          {!screenUtils.isSmallScreen && (
            <View style={styles.toggleThemeMode}>
              <IconButton
                icon={theme.isDarkMode ? 'sunny' : 'moon'}
                iconType='ionicons'
                size='small'
                onPress={handleToggleThemeMode}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    flexGrow: 1,
  },
  scrollView_contentContainerStyle: {},
  footer: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLink: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleThemeMode: {
    position: 'absolute',
    bottom: createSpacing(3),
    right: createSpacing(3),
    alignItems: 'flex-end',
  },
});

export default AuthLayout;
