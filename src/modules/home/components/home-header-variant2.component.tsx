import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// Core components
import { Avatar, Typography } from '@/components/core';

// Assets
import { AvatarSample } from '@/assets';

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

const AVATAR_SIZE = 48;

export const HomeHeaderVariant2: FC = () => {
  const navigation = useNavigation();
  const { isLoggedIn, authenticatedUser: user } = useAuth();

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

  return (
    <View style={styles.homeHeaderVariant2_root}>
      {/* 👇👇👇 User info 👇👇👇 */}
      <TouchableOpacity style={styles.userInfo_root} onPress={handlePressUserInfo} activeOpacity={0.65}>
        <View>
          {isLoggedIn ? (
            <>
              <Avatar source={AvatarSample} size={AVATAR_SIZE} />
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
            <Avatar
              type="text"
              size={AVATAR_SIZE}
              text={user?.name}
              color={isDarkMode(theme) ? grey[600] : grey[300]}
            />
          )}
        </View>
        <View style={styles.userInfo_textContainer}>
          {isLoggedIn ? (
            <>
              <Typography variant="body" style={{ color: theme.palette.text.secondary, marginTop: -3 }}>
                {getGreeting()}
              </Typography>
              <Typography variant="h5" style={styles.userInfo_mainText}>
                {user?.name}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" style={StyleSheet.flatten([styles.userInfo_mainText, { marginTop: -3 }])}>
                {t('home.greeting.hi_there')} 👋
              </Typography>
              <Typography variant="body" style={{ color: theme.palette.text.secondary }}>
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
  homeHeaderVariant2_root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: createSpacing(2),
    marginBottom: createSpacing(4),
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
    maxWidth: 180,
    maxHeight: 24,
    overflow: 'hidden',
  },
  userInfo_availableStatus: {
    height: 12,
    width: 12,
    borderRadius: 12,
    position: 'absolute',
    bottom: -2,
    right: 2,
    borderWidth: 1.4,
  },
});
