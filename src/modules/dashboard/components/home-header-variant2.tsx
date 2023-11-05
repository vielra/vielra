import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// core components
import { Avatar, Typography } from '@/components/core';

// assets
import { Assets } from '@/assets';

// hooks
import { useTheme } from '@/modules/theme/hooks';
import { useAuth } from '@/modules/auth/hooks';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// palette libs
import { grey } from '@/modules/theme/libs';

// utils
import { screenUtils } from '@/modules/app/utilities';
import { createSpacing, isDarkMode } from '@/modules/theme/utilities';
import { NavigationProps } from '@/navigators';

const now = new Date();
const time = now.getHours();

const AVATAR_SIZE = 48;

export const HomeHeaderVariant2: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated, user } = useAuth();

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
    if (!isAuthenticated) {
      navigation.navigate('login_screen');
    }
    navigation.navigate('profile_screen');
  };

  return (
    <View style={styles.homeHeaderVariant2_root}>
      {/* 👇👇👇 User info 👇👇👇 */}
      <TouchableOpacity style={styles.userInfo_root} onPress={handlePressUserInfo} activeOpacity={0.65}>
        <View>
          {isAuthenticated ? (
            <>
              <Avatar source={Assets.avatarSample} size={AVATAR_SIZE} />
              <View style={StyleSheet.flatten([styles.userInfo_availableStatus])} />
            </>
          ) : (
            <Avatar
              type='text'
              size={AVATAR_SIZE}
              text={user?.name}
              color={isDarkMode(theme) ? grey[600] : grey[300]}
            />
          )}
        </View>
        <View style={styles.userInfo_textContainer}>
          {isAuthenticated ? (
            <>
              <Typography style={{ color: theme.palette.text.secondary, marginTop: -3 }}>{getGreeting()}</Typography>
              <Typography variant='h5' style={styles.userInfo_mainText}>
                {user?.name}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant='h5' style={StyleSheet.flatten([styles.userInfo_mainText, { marginTop: -3 }])}>
                {t('home.greeting.hi_there')} 👋
              </Typography>
              <Typography style={{ color: theme.palette.text.secondary }}>
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
    marginLeft: createSpacing(screenUtils.isSmallScreen ? 2 : 3),
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
