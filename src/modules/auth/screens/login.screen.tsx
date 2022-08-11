import React, { FC, useRef, useCallback, useMemo, useEffect } from 'react';
import { Image, StyleSheet, View, BackHandler } from 'react-native';

// Core components.
import { Typography, Button, IconButton } from '@/components/core';

// Bottom sheet
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

// Hooks.
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Selectors.
import { auth_actionLoginWithSocialAccount, auth_rootSelector } from '@/modules/auth/redux';

// Constant
import { RoutesConstant } from '@/constants';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { isSmallScreen } from '@/utils';

// Interfaces
import { IAuthStackParamList } from '@/modules/auth/navigators';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Assets
import { LogoPrimary } from '@/assets';

// Components.
import { Ionicons } from '@/components/icons';
import { AuthLayout, LoginForm } from '@/modules/auth/components';

// Libs
import { red } from '@/modules/theme/libs';

// Theme config
import * as themeConfig from '@/modules/theme/config';

// Google Signin
import { GoogleSignInService } from '@/modules/auth/services';

// prettier-ignore
type AuthStackNavigationProp = NativeStackNavigationProp<IAuthStackParamList, typeof RoutesConstant.AuthStack.LoginScreen>;

const IMAGE_SIZE = 84;

export const LoginScreen: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { register_formIsDirty } = useAppSelector((s) => auth_rootSelector(s));

  const { t } = useTranslation();

  // Bottom sheet ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /** @var snapPoints - Bottom sheet snap points */
  const snapPoints = useMemo(() => [272], []);

  /** Handle when bottom sheet has changes */
  // const handleSheetChanges = useCallback((index: number): void => {
  //   // console.log('handleSheetChanges', index);
  //   null;
  // }, []);

  /** Handle open bottom sheet */
  const handleOpenBottomSheet = (): void => {
    bottomSheetModalRef.current?.present();
  };

  /** Handle close bottom sheet */
  const handleCloseBottomSheet = (): void => {
    bottomSheetModalRef.current?.dismiss();
  };

  // prettier-ignore
  const renderBackdropBottomSheet = useCallback((props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.45} pressBehavior="close" />
  ), []);

  /**
   * Handle press back button
   */
  const handlePressBack = useCallback(
    (shouldConfirm?: boolean) => {
      if (shouldConfirm && register_formIsDirty) {
        handleOpenBottomSheet();
      } else {
        handleCloseBottomSheet();
        navigation.canGoBack() ? navigation.goBack() : navigation.navigate(RoutesConstant.BottomTab.HomeScreen);
      }
    },
    [register_formIsDirty, navigation],
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handlePressBack(true);
      return true;
    });
    return () => backHandler.remove();
  }, []);

  /**
   * Sign In with Google
   */
  const handleLoginWithGoogle = async () => {
    const response = await GoogleSignInService.signIn();
    if (response) {
      const data = {
        social_id: response.user.id,
        social_name: (response.user.name as string) ?? (response.user.givenName as string),
        social_email: response.user.email,
        social_photo_url: response.user.photo,
      };
      // prettier-ignore
      dispatch(auth_actionLoginWithSocialAccount(
        { provider: 'google', data },
        (routeName) => navigation.navigate(routeName)
      ));
    }
  };

  return (
    <>
      <AuthLayout>
        {/* Back button */}

        <View style={styles.backButtonContainer}>
          <IconButton
            size="large"
            icon="ios-arrow-back"
            iconType="ionicons"
            onPress={() => handlePressBack(true)}
            iconStyle={{ color: theme.palette.secondary.main }}
          />
        </View>

        <View style={styles.header}>
          <Image source={LogoPrimary} style={styles.imageStyle} />
          <Typography variant="h1" style={{ marginBottom: createSpacing(2) }}>
            Welcome Back
          </Typography>
          <Typography>Login to your account</Typography>
        </View>

        <LoginForm />

        {/* --- Social auth ---*/}
        <View style={styles.socialLogin_container}>
          <Button
            onPress={handleLoginWithGoogle}
            variant="outlined"
            title={t('auth.login_with_google')}
            color="secondary"
          />
        </View>
      </AuthLayout>

      {/* Bottom sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdropBottomSheet}
        enableDismissOnClose={true}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet_root}
        backgroundStyle={StyleSheet.flatten([
          styles.bottomSheet_backgroundStyle,
          { backgroundColor: theme.palette.background.paper },
        ])}
        handleIndicatorStyle={StyleSheet.flatten([
          styles.bottomSheet_handleIndicatorStyle,
          { backgroundColor: 'transparent' },
        ])}>
        <View style={styles.bottomSheet_contentContainer}>
          <View>
            <View style={{ marginBottom: createSpacing(8) }}>
              <Ionicons name="close-circle-outline" size={54} color={red[500]} />
              <Typography variant="h2" style={{ marginBottom: createSpacing(2), marginTop: createSpacing(2) }}>
                Are you sure ?
              </Typography>
              <Typography variant="body">Do you want to cancel register ?</Typography>
            </View>
            <View style={styles.bottomSheet_buttonContainer}>
              <Button variant="text" color="secondary" title="No, Stay Here" onPress={handleCloseBottomSheet} />
              <Button
                variant="contained"
                color="error"
                title="Yes, cancel"
                onPress={() => {
                  handleCloseBottomSheet();
                  setTimeout(() => {
                    handlePressBack(false);
                  }, 300);
                }}
                startIcon="close-circle-outline"
                iconType="ionicons"
              />
            </View>
          </View>
        </View>
      </BottomSheetModal>
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
  backButtonContainer: {
    height: isSmallScreen ? 54 : 64,
    marginLeft: createSpacing(isSmallScreen ? 3 : 4),
    marginTop: createSpacing(isSmallScreen ? 2 : 3),
  },
  header: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? createSpacing(5) : createSpacing(8),
    paddingHorizontal: createSpacing(isSmallScreen ? 6 : 10),
  },
  imageStyle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'contain',
    marginBottom: createSpacing(4),
  },
  socialLogin_container: {
    paddingHorizontal: createSpacing(6),
  },
  bottomSheet_root: {
    flex: 1,
  },
  bottomSheet_contentContainer: {
    flex: 1,
    marginBottom: createSpacing(4),
    paddingHorizontal: createSpacing(isSmallScreen ? 7 : 10),
  },
  bottomSheet_backgroundStyle: { borderRadius: themeConfig.shape.borderRadius * 3 },
  bottomSheet_handleIndicatorStyle: { height: 2, width: 32 },
  bottomSheet_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
