import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react';

import { StyleSheet, Dimensions, ImageBackground, ScrollView, View, TouchableOpacity } from 'react-native';

// Components
import { Typography } from '@/components/core';
import { IconButton } from '@/components/core/icon-button';
import { SafeAreaView } from 'react-native-safe-area-context';

// Hooks.
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { createSpacing, isDarkMode } from '@/modules/theme/utils';
import { useNavigation, useRoute } from '@react-navigation/native';

// Action creators.
import { theme_actionToggleMode } from '@/modules/theme/redux';
import { isTablet } from 'react-native-device-info';

// Assets
import {
  WavyBackgroundPortrait,
  WavyBackgroundLandScape,
  WavyBackgroundLandScapeDark,
  WavyBackgroundPortraitDark,
} from '@/assets';

// Constants
import { RoutesConstant } from '@/constants';

// Interfaces
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IAuthStackParamList } from '../navigators';
import { isSmallScreen } from '@/utils';

const { width, height } = Dimensions.get('screen');

// Dynamic layout background image.
const LayoutBackground: FC<{ isDark: boolean }> = ({ isDark }) => {
  if (isTablet()) {
    return (
      <ImageBackground
        source={isDark ? WavyBackgroundLandScapeDark : WavyBackgroundLandScape}
        imageStyle={{ resizeMode: 'cover' }}
        style={[StyleSheet.absoluteFill, { width, height }]}
      />
    );
  } else {
    return (
      <ImageBackground
        source={isDark ? WavyBackgroundPortraitDark : WavyBackgroundPortrait}
        imageStyle={{ resizeMode: 'cover' }}
        style={[StyleSheet.absoluteFill, { width, height }]}
      />
    );
  }
};

type AuthStackNavigationProp = NativeStackNavigationProp<IAuthStackParamList, typeof RoutesConstant.Auth.LoginScreen>;

export const AuthLayout: FC<PropsWithChildren<ReactNode>> = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const routes = useRoute();

  /** is register page */
  const isRegisterScreen = useMemo<boolean>(() => {
    return routes.name === RoutesConstant.Auth.RegisterScreen;
  }, [routes]);

  const handleToggleThemeMode = (): void => {
    dispatch(theme_actionToggleMode());
  };

  return (
    <>
      <LayoutBackground isDark={isDarkMode(theme)} />
      <SafeAreaView style={StyleSheet.flatten([styles.root])}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollView_contentContainerStyle}>
          {children}
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.formLink}>
            <Typography style={{ marginRight: createSpacing(1) }}>
              {isRegisterScreen ? 'Already have an account ?' : "Don't have an account ?"}
            </Typography>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  isRegisterScreen ? RoutesConstant.Auth.LoginScreen : RoutesConstant.Auth.RegisterScreen,
                )
              }>
              <Typography style={{ color: theme.palette.primary.main, fontWeight: '700' }}>
                {isRegisterScreen ? 'Login' : 'Register'}
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Display only large screen */}
          {!isSmallScreen && (
            <View style={styles.toggleThemeMode}>
              <IconButton
                icon={isDarkMode(theme) ? 'ios-sunny' : 'moon'}
                iconType="ionicons"
                size="small"
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
  },
  scrollView_contentContainerStyle: {
    // paddingHorizontal: createSpacing(isSmallScreen ? 8 : 12),
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLink: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: createSpacing(3),
  },
  toggleThemeMode: {
    position: 'absolute',
    bottom: createSpacing(3),
    right: createSpacing(3),
    alignItems: 'flex-end',
  },
});
