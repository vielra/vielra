import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Bottom sheet
import BottomSheet from '@gorhom/bottom-sheet';

// Core components
import { Avatar, Button, Typography } from '@/components/core';

// Components
import { BottomSheetBackdropComponent } from '@/components/shared';

// Theme config.
import * as themeConfig from '@/modules/theme/config';

// Assets
import { AvatarSquareBlue } from '@/assets';

// Hooks
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { useCommon } from '@/modules/common/hooks';
import { useNavigation } from '@react-navigation/native';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Constants
import { RoutesConstant } from '@/constants';

// Action creators
import { common_actionSetBottomSheetAuthRequired } from '@/modules/common/redux';

// App config.
// import { AppConfig } from '@/config';

export const BottomSheetWarningAuthRequired: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { showBottomSheetWarningAuthRequired } = useCommon();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [340], []);

  // callbacks
  const handleSheetChanges = useCallback((currentIndex: number): void => {
    if (currentIndex < 0) {
      dispatch(common_actionSetBottomSheetAuthRequired(false));
      bottomSheetRef.current?.close();
    }
  }, []);

  const renderBackdropBottomSheet = useCallback(
    (backdropProps) => <BottomSheetBackdropComponent {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handlePressButton = (type: 'login' | 'register'): void => {
    dispatch(common_actionSetBottomSheetAuthRequired(false));

    bottomSheetRef.current?.close();

    // prettier-ignore
    navigation.navigate(
      RoutesConstant.RootStack.AuthStack as never,
      { screen: type === 'login' ? RoutesConstant.AuthStack.LoginScreen : RoutesConstant.AuthStack.RegisterScreen } as never,
    );
  };

  /** watch showBottomSheetWarningAuthRequired  */
  useEffect(() => {
    if (showBottomSheetWarningAuthRequired) {
      bottomSheetRef.current?.expand();
    }

    // return bottomSheetRef.current?.close();
  }, [showBottomSheetWarningAuthRequired]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={showBottomSheetWarningAuthRequired ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={styles.bottomSheet_root}
      backdropComponent={renderBackdropBottomSheet}
      backgroundStyle={StyleSheet.flatten([
        styles.bottomSheet_backgroundStyle,
        { backgroundColor: theme.palette.background.paper },
      ])}
      handleIndicatorStyle={StyleSheet.flatten([
        styles.bottomSheet_handleIndicatorStyle,
        { backgroundColor: theme.palette.divider },
      ])}
      onChange={handleSheetChanges}>
      <View style={styles.bottomSheet_content}>
        <Avatar source={AvatarSquareBlue} size={60} style={{ marginBottom: createSpacing(2) }} />
        <Typography variant="h3">Hey Stranger,</Typography>
        <Typography style={{ marginBottom: createSpacing(5), color: theme.palette.text.secondary }} variant="h3">
          Your're not logged in
        </Typography>

        <View style={{ marginTop: createSpacing(4) }}>
          <Typography>To access this feature you must login</Typography>
        </View>

        <View>
          <Button size="extra-large" title="Login" color="secondary" onPress={() => handlePressButton('login')} />
        </View>
        <View>
          <View style={styles.formLink}>
            <Typography style={{ marginRight: createSpacing(1) }}>Don't have an account ?</Typography>
            <TouchableOpacity onPress={() => handlePressButton('register')}>
              <Typography style={{ color: theme.palette.primary.main, fontWeight: '700' }}>{'Register'}</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet_root: {
    flex: 1,
  },
  bottomSheet_backgroundStyle: { borderRadius: themeConfig.shape.borderRadius * 3 },
  bottomSheet_handleIndicatorStyle: { height: 2, width: 32 },
  bottomSheet_content: {
    flex: 1,
    marginVertical: createSpacing(2),
    paddingHorizontal: createSpacing(isSmallScreen ? 6 : 9),
  },

  formLink: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: createSpacing(3),
  },
});
