import React, { FC } from 'react';
import { StyleSheet, View, Animated, Pressable, TouchableOpacity } from 'react-native';

// Core components
import { Avatar, Typography } from '@/components/core';

// Assets
import { AvatarSample, LogoPrimary } from '@/assets';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing, isDarkMode } from '@/modules/theme/utils';

// Hooks
import { useTheme } from '@/modules/theme/hooks';
import { useAuth } from '@/modules/auth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// Constants
import { RoutesConstant } from '@/constants';

// Theme libs
import { amber, green, grey, red } from '@/modules/theme/libs';

const now = new Date();
const time = now.getHours();

const LOGO_SIZE = 30;

export const HomeHeaderVariant1: FC = () => {
  const navigation = useNavigation();
  const { isLoggedIn, authenticatedUser: user } = useAuth();
  const animatedLogo = new Animated.Value(0);

  const { t } = useTranslation();

  const theme = useTheme();
  const getGreeting = (): string => {
    if (time >= 1 && time < 11) {
      return t('home.greeting.good_morning');
    } else if (time >= 11 && time < 16) {
      return t('home.greeting.good_afternoon');
    } else if (time >= 16 && time < 19) {
      return t('home.greeting.good_evening');
    } else if (time > 19) {
      return t('home.greeting.good_night');
    } else {
      // otherwise just return Hello
      return 'Hello 👋';
    }
  };

  /**
   * Handle press user/guest info.
   */
  const handlePressUserInfo = (): void => {
    if (!isLoggedIn) {
      navigation.navigate(
        RoutesConstant.RootStack.AuthStack as never,
        { screen: RoutesConstant.AuthStack.LoginScreen } as never,
      );
    }
    navigation.navigate(RoutesConstant.BottomTab.Profile as never);
  };

  /**
   * Handle press logo
   * @param {'pressIn' | 'pressOut' | 'longPress'} type
   */
  const handlePressLogo = (type: 'pressIn' | 'pressOut' | 'longPress'): void => {
    Animated.timing(animatedLogo, {
      toValue: type === 'pressIn' ? 1 : 0,
      duration: 175,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.homeHeaderVariant1_root}>
      {/* 👇👇👇 Vielra Logo 👇👇👇 */}
      <Pressable
        onPressIn={() => handlePressLogo('pressIn')}
        onPressOut={() => handlePressLogo('pressOut')}
        onLongPress={() => handlePressLogo('longPress')}>
        <Animated.Image
          source={LogoPrimary}
          style={[
            styles.homeHeaderVariant1_logo,
            {
              transform: [
                {
                  scale: animatedLogo.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      </Pressable>

      {/* 👇👇👇 User info 👇👇👇 */}
      <TouchableOpacity style={styles.userInfo_root} onPress={handlePressUserInfo} activeOpacity={0.65}>
        <View>
          {isLoggedIn ? (
            <>
              <Avatar source={AvatarSample} />
              <View
                style={StyleSheet.flatten([
                  styles.userInfo_availableStatus,
                  {
                    ...(user?.availableStatusText === 'available' && {
                      backgroundColor: green[400],
                    }),
                    ...(user?.availableStatusText === 'away' && {
                      backgroundColor: amber[500],
                    }),
                    ...(user?.availableStatusText === 'do not disturb' && {
                      backgroundColor: red[700],
                    }),
                    ...(user?.availableStatusText === 'offline' && {
                      backgroundColor: grey[200],
                    }),
                    ...(!user?.availableStatusText && {
                      backgroundColor: green[400],
                    }),
                    borderColor: isDarkMode(theme) ? grey[200] : theme.palette.common.white,
                  },
                ])}
              />
            </>
          ) : (
            <Avatar type="text" size="medium" text={user?.name} />
          )}
        </View>
        <View style={styles.userInfo_textContainer}>
          {isLoggedIn ? (
            <>
              <Typography variant="subtitle" style={{ color: theme.palette.text.secondary, marginTop: -3 }}>
                {getGreeting()}
              </Typography>
              <Typography variant="h6" style={styles.userInfo_mainText}>
                {user?.name}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" style={styles.userInfo_mainText}>
                {t('home.greeting.hi_there')} 👋
              </Typography>
              <Typography variant="subtitle" style={{ color: theme.palette.text.secondary }}>
                {t('home.greeting.not_logged_in')}
              </Typography>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeHeaderVariant1_root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: createSpacing(2),
    marginBottom: createSpacing(4),
  },
  homeHeaderVariant1_logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    resizeMode: 'contain',
  },
  userInfo_root: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  userInfo_textContainer: {
    marginLeft: createSpacing(isSmallScreen ? 2 : 3),
  },
  userInfo_mainText: {
    maxWidth: 160,
    textTransform: 'capitalize',
    maxHeight: 20,
    overflow: 'hidden',
  },
  userInfo_availableStatus: {
    height: 10,
    width: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: -2,
    right: 2,
    borderWidth: 1.4,
  },
});
