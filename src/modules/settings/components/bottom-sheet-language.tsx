import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Image, StyleSheet, View, TouchableNativeFeedback } from 'react-native';

// bottom sheet
import BottomSheet, { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

// core components
import { Typography } from '@/components/core';

// components
import { BottomSheetBackdrop } from '@/components/shared';

// theme config.
import { themeConfig } from '@/modules/theme/configs';

// assets
import { Assets } from '@/assets';

// hooks
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/modules/theme/hooks';
import { useApp, useToast } from '@/modules/app/hooks';

// utils
import { createSpacing } from '@/modules/theme/utilities';
import { screenUtils } from '@/modules/app/utilities';

import { useAppDispatch } from '@/plugins/redux';
import { bottomSheetStyles } from '@/components/shared/bottom-sheet/bottom-sheet.styles';

// types
import { AppLanguageCode } from '@/modules/app/interfaces';

// libs
import { appLibs } from '@/modules/app/libs';

interface Props {
  index: number;
  setIndex: (index: number) => void;
}

interface LanguageOption {
  code: AppLanguageCode;
  name: string;
}

const MENU_ITEM_HEIGHT = 52;

const BottomSheetLanguage: FC<Props> = ({ index, setIndex }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { language, app_setLanguage } = useApp();
  const { showToast } = useToast();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [MENU_ITEM_HEIGHT * 3 + 80], []);

  // callbacks
  const handleSheetChanges = useCallback((currentIndex: number): void => {
    setIndex(currentIndex);
  }, []);

  const renderBackdropBottomSheet = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    [],
  );

  const onSelectLanguage = (lang: LanguageOption): void => {
    if (language !== lang.code) {
      dispatch(app_setLanguage(lang.code));
      showToast({
        type: 'success',
        position: 'bottom',
        variant: 'filled',
        text1: `Language set to ${lang.name}`,
      });
    }
  };

  const renderIconFlag = (lang: AppLanguageCode) => {
    let flag;
    switch (lang) {
      case 'en':
        flag = Assets.flagUS_xs;
        break;
      case 'id':
        flag = Assets.flagID_xs;
        break;
      case 'vi':
        flag = Assets.flagVN_xs;
        break;
      default:
        flag = undefined;
        break;
    }
    return <Image source={flag} style={styles.menuItem_iconFlag} />;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={bottomSheetStyles.bottomSheet_root}
      backdropComponent={renderBackdropBottomSheet}
      backgroundStyle={StyleSheet.flatten([
        bottomSheetStyles.bottomSheet_backgroundStyle,
        { backgroundColor: theme.palette.background.paper },
      ])}
      handleIndicatorStyle={StyleSheet.flatten([
        bottomSheetStyles.bottomSheet_handleIndicatorStyle,
        { backgroundColor: theme.palette.divider },
      ])}
      onChange={handleSheetChanges}>
      <View style={bottomSheetStyles.bottomSheet_content}>
        <Typography style={styles.textHeader} gutterBottom={3} fontWeight='bold' color='text.secondary'>
          {t('settings.select_language')}
        </Typography>
        <View style={styles.menuItem_wrapper}>
          {appLibs.languages.map((x) => (
            <TouchableNativeFeedback key={x.code} onPress={() => onSelectLanguage(x as LanguageOption)}>
              <View style={styles.menuItem_container}>
                {renderIconFlag(x.code as AppLanguageCode)}
                <Typography style={styles.menuItem_text} variant='h5' fontWeight='bold'>
                  {x.name}
                </Typography>
              </View>
            </TouchableNativeFeedback>
          ))}
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
    paddingHorizontal: createSpacing(screenUtils.isSmallScreen ? 6 : 9),
  },
  textHeader: {
    textAlign: 'center',
  },
  menuItem_wrapper: {},
  menuItem_container: {
    flexDirection: 'row',
    height: MENU_ITEM_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: createSpacing(6),
  },
  menuItem_text: { lineHeight: 18 },
  menuItem_iconFlag: { width: 20, height: 20, resizeMode: 'contain', marginRight: createSpacing(5) },
});

export default BottomSheetLanguage;
