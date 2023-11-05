import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

// core components.
import { Typography, IconButton } from '@/components/core';

// hooks
// import { useTheme } from '@/modules/theme/hooks';

// utils
import { createSpacing } from '@/modules/theme/utilities';
import { screenUtils } from '@/modules/app/utilities';

// assets
import { Assets } from '@/assets';

// components.
import { AuthLayout, LoginForm } from '@/modules/auth/components';

// Google Signin
// import { GoogleSignInService } from '@/modules/auth/services';

const IMAGE_SIZE = 84;

const LoginScreen: FC = () => {
  /**
   * Sign In with Google
   */
  const handleLoginWithGoogle = async () => {
    // const response = await GoogleSignInService.signIn();
    // if (response) {
    //   const data = {
    //     social_id: response.user.id,
    //     social_name: (response.user.name as string) ?? (response.user.givenName as string),
    //     social_email: response.user.email,
    //     social_photo_url: response.user.photo,
    //   };
    // }
  };

  return (
    <AuthLayout>
      <View style={styles.backButtonContainer}>
        <IconButton size='large' icon='arrow-back' iconType='ionicons' onPress={() => handlePressBack(true)} />
      </View>
      <View style={styles.header}>
        <Image source={Assets.logoPrimary} style={styles.logoStyle} />
        <Typography variant='h2' fontWeight='bold' style={{ marginBottom: createSpacing(2) }}>
          Welcome back 👋
        </Typography>
        <Typography>Login to your account</Typography>
      </View>
      <LoginForm />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
  },
  backButtonContainer: {
    height: screenUtils.isSmallScreen ? 54 : 64,
    marginLeft: createSpacing(screenUtils.isSmallScreen ? 3 : 4),
    marginTop: createSpacing(screenUtils.isSmallScreen ? 2 : 3),
  },
  header: {
    alignItems: 'center',
    marginBottom: screenUtils.isSmallScreen ? createSpacing(5) : createSpacing(8),
    paddingHorizontal: createSpacing(screenUtils.isSmallScreen ? 6 : 10),
  },
  logoStyle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'contain',
    marginBottom: createSpacing(4),
  },
});

export default LoginScreen;
