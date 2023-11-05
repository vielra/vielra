import React, { FC } from 'react';
import { StyleSheet, View, Animated, Pressable, TouchableOpacity } from 'react-native';

// core components
import { Avatar, Typography } from '@/components/core';

// assets
import { Assets } from '@/assets';

// hooks
import { useTheme } from '@/modules/theme/hooks';
import { useAuth } from '@/modules/auth/hooks';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// utils
import { createSpacing } from '@/modules/theme/utilities';
import { screenUtils } from '@/modules/app/utilities';
import { NavigationProps } from '@/navigators';

const now = new Date();
const time = now.getHours();

const LOGO_SIZE = 30;

export const HomeHeaderVariant1: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated, user } = useAuth();
  const animatedLogo = new Animated.Value(0);

  const { t } = useTranslation();

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
          source={Assets.logoPrimary}
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
          {isAuthenticated ? (
            <>
              <Avatar source={Assets.avatarSample} />
              <View style={StyleSheet.flatten([styles.userInfo_availableStatus])} />
            </>
          ) : (
            <Avatar type='text' size='medium' text={user?.name} />
          )}
        </View>
        <View style={styles.userInfo_textContainer}>
          {isAuthenticated ? (
            <>
              <Typography variant='body2' style={{ marginTop: -3 }}>
                {getGreeting()}
              </Typography>
              <Typography variant='h6' style={styles.userInfo_mainText}>
                {user?.name}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant='h6' style={styles.userInfo_mainText}>
                {t('home.greeting.hi_there')} 👋
              </Typography>
              <Typography variant='body2'>{t('home.greeting.not_logged_in')}</Typography>
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
    marginLeft: createSpacing(screenUtils.isSmallScreen ? 2 : 3),
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
