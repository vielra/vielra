import React, { FC, useRef, useCallback, useState, useMemo, useEffect } from 'react';
import { Image, StyleSheet, View, BackHandler } from 'react-native';

// Core components.
import { Typography, Button, IconButton } from '@/components/core';

// Bottom sheet
import { BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';

// Hooks.
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Utils
import { createSpacing } from '@/modules/theme/utilities';

// Interfaces

// Assets
import { Assets } from '@/assets';

// Components.
import { Ionicons } from '@/components/core';
import { AuthLayout, RegisterForm } from '@/modules/auth/components';

// Libs
import { red } from '@/modules/theme/libs';

// Theme config
import { themeConfig } from '@/modules/theme/configs';

// utils
import { screenUtils } from '@/modules/app/utilities';
import { NavigationProps } from '@/navigators';
import { BottomSheetBackdrop } from '@/components/shared';

const IMAGE_SIZE = 84;

const RegisterScreen: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [formIsDirty, setFormIsDirty] = useState(false);

  // Bottom sheet ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /** @var snapPoints - Bottom sheet snap points */
  const snapPoints = useMemo(() => [272], []);

  /** Handle open bottom sheet */
  const handleOpenBottomSheet = (): void => {
    bottomSheetModalRef.current?.present();
  };

  /** Handle close bottom sheet */
  const handleCloseBottomSheet = (): void => {
    bottomSheetModalRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior='close' />
    ),
    [],
  );

  /**
   * Handle press back button
   */
  const handlePressBack = useCallback(
    (shouldConfirm?: boolean) => {
      if (shouldConfirm && formIsDirty) {
        handleOpenBottomSheet();
      } else {
        handleCloseBottomSheet();
        navigation.canGoBack() ? navigation.goBack() : navigation.replace('bottom_tab_stack');
      }
    },
    [formIsDirty, navigation],
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handlePressBack(true);
      return true;
    });
    7;
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <AuthLayout>
        {/* Back button */}
        <View style={styles.backButtonContainer}>
          <IconButton size='large' icon='arrow-back' iconType='ionicons' onPress={() => handlePressBack(true)} />
        </View>

        <View style={styles.header}>
          <Image source={Assets.logoPrimary} style={styles.imageStyle} />
          <Typography variant='h2' fontWeight='bold'>
            Hi, there 👋
          </Typography>
          <Typography color='text.secondary' variant='h4' fontWeight='bold'>
            Let's create your vielra account
          </Typography>
        </View>
        <RegisterForm />
      </AuthLayout>

      {/* Bottom sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
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
              <Ionicons name='close-circle-outline' size={54} color={red[500]} />
              <Typography variant='h2' style={{ marginBottom: createSpacing(2), marginTop: createSpacing(2) }}>
                Are you sure ?
              </Typography>
              <Typography>Do you want to cancel register ?</Typography>
            </View>
            <View style={styles.bottomSheet_buttonContainer}>
              <Button variant='text' color='secondary' title='No, Stay Here' onPress={handleCloseBottomSheet} />
              <Button
                variant='contained'
                color='error'
                title='Yes, cancel'
                onPress={() => {
                  handleCloseBottomSheet();
                  setTimeout(() => {
                    handlePressBack(false);
                  }, 300);
                }}
                startIcon='close-circle-outline'
                iconType='ionicons'
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
    height: screenUtils.isSmallScreen ? 54 : 64,
    marginLeft: createSpacing(screenUtils.isSmallScreen ? 3 : 4),
    marginTop: createSpacing(screenUtils.isSmallScreen ? 2 : 3),
  },
  header: {
    alignItems: 'center',
    marginBottom: screenUtils.isSmallScreen ? createSpacing(5) : createSpacing(8),
    paddingHorizontal: createSpacing(screenUtils.isSmallScreen ? 6 : 10),
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
    paddingHorizontal: createSpacing(screenUtils.isSmallScreen ? 7 : 10),
  },
  bottomSheet_backgroundStyle: { borderRadius: themeConfig.shape.borderRadius * 3 },
  bottomSheet_handleIndicatorStyle: { height: 2, width: 32 },
  bottomSheet_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RegisterScreen;
