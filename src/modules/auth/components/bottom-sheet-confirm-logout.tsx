import { memo, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProps } from '@/navigators/navigation.type';

// hooks
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@/plugins/redux';
import { useTheme } from '@/modules/theme/hooks';
import { useApp } from '@/modules/app/hooks';
import { useAuth } from '@/modules/auth/hooks';

// components
import { BottomSheetBackdrop } from '@/components/shared';
import { Button, IconButton, Typography } from '@/components/core';
import BottomSheet, { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { bottomSheetStyles } from '@/components/shared/bottom-sheet/bottom-sheet.styles';

// utils
import { createSpacing } from '@/modules/theme/utilities';
import { themeConfig } from '@/modules/theme/configs';
import { authUtils } from '../utilities';

const animationConfig = {
  duration: 200,
  overshootClamping: false,
};

const BottomSheetConfirmLogout = () => {
  const navigation = useNavigation<NavigationProps>();
  const ref = useRef<BottomSheet>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { bottomTabVisible, app_setBottomTabVisible } = useApp();
  const {
    openBottomSheetConfirmLogout,
    auth_setOpenBottomConfirmSheetLogout,
    auth_reset,
    isAuthenticated,
    auth_revokeToken,
    auth_revokeTokenIsLoading,
  } = useAuth();

  const handleClose = (): void => {
    ref.current?.snapToIndex(-1, animationConfig);
    dispatch(auth_setOpenBottomConfirmSheetLogout(false));
    dispatch(app_setBottomTabVisible(true));
  };

  useEffect(() => {
    if (openBottomSheetConfirmLogout) {
      console.log('CALL ME');
      ref.current?.snapToIndex(0, animationConfig);
      // dispatch(app_setBottomTabVisible(false));
    }
  }, [bottomTabVisible, openBottomSheetConfirmLogout, ref?.current]);

  const onBottomSheetChange = useCallback(
    (index: number) => {
      console.log('onBottomSheetChange', index);
      if (index < 0) {
        handleClose();
        dispatch(app_setBottomTabVisible(true));
      } else {
        dispatch(app_setBottomTabVisible(false));
      }
    },
    [openBottomSheetConfirmLogout],
  );

  const onPressCloseButton = useCallback(() => {
    ref.current?.close(animationConfig);
    dispatch(app_setBottomTabVisible(true));
    dispatch(auth_setOpenBottomConfirmSheetLogout(false));
  }, [ref?.current, bottomTabVisible, openBottomSheetConfirmLogout]);

  const onConfirmLogout = useCallback(async () => {
    try {
      await auth_revokeToken({ currentAccessToken: authUtils.getToken() as string }).unwrap();
      handleClose();
      dispatch(auth_reset());
      navigation.navigate('dashboard_screen');
    } catch (e) {
      handleClose();
      dispatch(auth_reset());
      navigation.navigate('dashboard_screen');
    }
  }, [isAuthenticated]);

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={renderBackdrop}
      snapPoints={[260]}
      enablePanDownToClose={true}
      style={StyleSheet.flatten([bottomSheetStyles.bottomSheet_root])}
      handleIndicatorStyle={bottomSheetStyles.bottomSheet_handleIndicatorStyle}
      backgroundStyle={StyleSheet.flatten([
        bottomSheetStyles.bottomSheet_backgroundStyle,
        {
          backgroundColor: theme.palette.background.paper,
          borderRadius: themeConfig.shape.borderRadius * 4,
        },
      ])}
      onChange={onBottomSheetChange}>
      <View
        style={{
          zIndex: 10,
          top: 0,
          right: createSpacing(4),
          position: 'absolute',
          alignSelf: 'flex-end',
        }}>
        <IconButton size='large' onPress={onPressCloseButton} icon='close' iconType='ionicons' />
      </View>
      <View
        style={StyleSheet.flatten([
          styles.root,
          {
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
          },
        ])}>
        <View style={styles.content}>
          {isAuthenticated ? (
            <>
              <Typography variant='h5' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
                Are you sure ?
              </Typography>
              <Typography color='text.secondary' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
                Do you want to log out ?
              </Typography>
            </>
          ) : (
            <>
              <Typography variant='h5' fontWeight='bold' gutterBottom style={{ textAlign: 'center' }}>
                See you..
              </Typography>
            </>
          )}
        </View>
        <Button
          rounded
          isLoading={auth_revokeTokenIsLoading}
          title='Log out'
          endIcon='exit-outline'
          iconType='ionicons'
          size='large'
          onPress={onConfirmLogout}
          style={styles.btn}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: themeConfig.horizontalSpacing,
    marginBottom: createSpacing(5),
    paddingTop: 20,
  },
  btn: {
    width: 220,
    marginTop: 'auto',
    alignSelf: 'center',
  },
});

export default memo(BottomSheetConfirmLogout);
