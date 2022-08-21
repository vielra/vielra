import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

// Core components
import { Button, Typography } from '@/components/core';

// Components
import { SafeAreaView } from '@/components/shared';

// Constants
import { RoutesConstant } from '@/constants';

// Hooks
import { useAuth } from '@/modules/auth/hooks';

// Utils
import { createSpacing } from '@/modules/theme/utils';

// Interfaces
import { IBottomTabParamList } from '@/navigators/bottom-tab.navigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { auth_actionRevokeToken, GoogleSignInService } from '@/modules/auth';

type Props = BottomTabScreenProps<IBottomTabParamList, typeof RoutesConstant.BottomTab.Profile>;

export const ProfileScreen: FC<Props> = (props) => {
  const { isLoggedIn, authenticatedUser: user, authProvider } = useAuth();
  const dispatch = useDispatch();

  const handleLogOut = (): void => {
    dispatch(auth_actionRevokeToken());
  };

  const getGoogleUser = async () => {
    const googleUser = await GoogleSignInService.getCurrentUser();
    console.log('googleUser', googleUser);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {isLoggedIn ? (
          <>
            <Typography>Hello,</Typography>
            <Typography variant="h2">{user?.name}</Typography>
          </>
        ) : (
          <View>
            <Typography style={{ marginBottom: createSpacing(4) }}>You are not logged in</Typography>
            <Button
              variant="outlined"
              title="Login in"
              style={{ marginBottom: createSpacing(6) }}
              onPress={() =>
                props.navigation.navigate(RoutesConstant.RootStack.AuthStack, {
                  screen: RoutesConstant.AuthStack.LoginScreen,
                })
              }
            />

            <Button onPress={handleLogOut} variant="outlined" title="Log Out" />
            {authProvider === 'google' && <Button onPress={getGoogleUser} variant="outlined" title="Get google user" />}
          </View>
        )}
        <Button
          onPress={() => props.navigation.navigate(RoutesConstant.BottomTab.HomeScreen)}
          variant="text"
          title="Go to home"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
