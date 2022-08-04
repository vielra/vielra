import React, { FC, useRef, useCallback, useMemo, useEffect } from 'react';
import { Image, StyleSheet, View, BackHandler } from 'react-native';

// Core components.
import { Typography, Button, IconButton } from '@/components/core';

// Bottom sheet
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

// Hooks.
import { useAppSelector } from '@/store';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Selectors.
import { auth_rootSelector } from '@/modules/auth/redux';

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

type AuthStackNavigationProp = NativeStackNavigationProp<IAuthStackParamList, typeof RoutesConstant.Auth.LoginScreen>;

const IMAGE_SIZE = 84;

export const LoginScreen: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { register_formIsDirty } = useAppSelector((s) => auth_rootSelector(s));

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

  const renderBackdropBottomSheet = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.45} pressBehavior="close" />
    ),
    [],
  );

  /**
   * Handle press back button
   */
  const handlePressBack = useCallback(
    (shouldConfirm?: boolean) => {
      if (shouldConfirm && register_formIsDirty) {
        handleOpenBottomSheet();
      } else {
        handleCloseBottomSheet();
        navigation.canGoBack() ? navigation.goBack() : navigation.replace(RoutesConstant.WelcomeScreen);
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
