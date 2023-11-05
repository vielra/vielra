import { useCallback } from 'react';

// hooks
import { useAuth } from '@/modules/auth/hooks';
import { useTheme } from '@/modules/theme/hooks';

// components
import { Screen } from '@/components/core';
import { GuestInfo, ProfileInfo } from '../components';
import { BottomSheetConfirmLogout } from '@/modules/auth/components';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch } from '@/plugins/redux';

const ProfileScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isAuthenticated, auth_getUser, auth_setUser } = useAuth();

  /**
   * check authenticated user
   */
  const checkAuthenticatedUser = async (): Promise<void> => {
    try {
      const response = await auth_getUser(undefined);
      if (response?.isSuccess) {
        dispatch(auth_setUser(response.data));
      }
    } catch (e) {}
  };

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        checkAuthenticatedUser();
      }
    }, [isAuthenticated]),
  );

  return (
    <>
      <Screen
        preset='fixed'
        statusBarStyle='dark-content'
        title='Profile'
        titleSize='small'
        backgroundColor={theme.palette.background.default}
        headerBackgroundColor={theme.palette.background.default}
        style={{ paddingHorizontal: theme.horizontalSpacing }}>
        {isAuthenticated ? <ProfileInfo /> : <GuestInfo />}
      </Screen>
      <BottomSheetConfirmLogout />
    </>
  );
};

export default ProfileScreen;
