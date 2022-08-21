import React, { FC, useCallback, useMemo, useRef } from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';

// Bottom sheet
import BottomSheet from '@gorhom/bottom-sheet';

// Core components
import { Typography } from '@/components/core';

// Components
import { BottomSheetBackdropComponent } from '@/components/shared';

// Theme config.
import * as themeConfig from '@/modules/theme/config';

// Assets
import { FlagIndonesia, FlagUS, FlagVietnam } from '@/assets';

// App config.
import { AppConfig } from '@/config';

// Hooks
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/modules/theme/hooks';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing, isDarkMode } from '@/modules/theme/utils';

// Localization modules
import { AppLanguage, localization_actionSetLanguage, useLocalization } from '@/modules/localization';
import { toast_actionSetToast } from '@/modules/toast/redux';
import { grey } from '@/modules/theme/libs';

interface Props {
  index: number;
  setIndex: (index: number) => void;
}

export const BottomSheetLanguage: FC<Props> = ({ index, setIndex }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { language } = useLocalization();

  const { t } = useTranslation();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [205], []);

  // callbacks
  const handleSheetChanges = useCallback((currentIndex: number): void => {
    setIndex(currentIndex);
  }, []);

  // const handleOpenBottomSheet = (): void => {
  //   bottomSheetRef.current?.expand();
  // };

  const renderBackdropBottomSheet = useCallback(
    (backdropProps) => <BottomSheetBackdropComponent {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const handleSelectLanguage = (lang: AppLanguage): void => {
    // i18n.changeLanguage(lang.code); // don't need to set language directly
    if (language.code !== lang.code) {
      dispatch(localization_actionSetLanguage(lang));

      // Show toast
      dispatch(
        toast_actionSetToast({
          show: true,
          placement: 'bottom',
          messages: `Language has been set to ${lang.name}`,
          variant: 'outlined',
          severity: 'success',
        }),
      );
    }
  };

  const renderIconFlag = (lang: AppLanguage['code']) => {
    let flag;
    switch (lang) {
      case 'en':
        flag = FlagUS;
        break;
      case 'id':
        flag = FlagIndonesia;
        break;
      case 'vi':
        flag = FlagVietnam;
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
        <Typography style={{ marginBottom: createSpacing(5) }} variant="h3">
          {t('settings.select_language')}
        </Typography>

        <View style={styles.bottomSheet_menuItemContainer}>
          {AppConfig.SupportedLanguages.map((lang) => (
            <Pressable
              onPress={() => handleSelectLanguage(lang)}
              key={lang.code}
              style={({ pressed }) =>
                StyleSheet.flatten([
                  styles.menuItem_root,
                  {
                    // Selected language style
                    ...(lang.code === language.code
                      ? {
                          backgroundColor: isDarkMode(theme) ? grey[800] : theme.palette.secondary.light,
                          borderColor: isDarkMode(theme) ? theme.palette.secondary.main : theme.palette.secondary.light,
                        }
                      : {}),
                    ...(pressed && {
                      backgroundColor: isDarkMode(theme) ? grey[800] : theme.palette.secondary.light,
                      borderColor: isDarkMode(theme) ? grey[800] : theme.palette.secondary.light,
                    }),
                  },
                ])
              }>
              {renderIconFlag(lang.code)}
              <Typography variant="subtitle" style={StyleSheet.flatten([styles.menuItem_langText])}>
                {lang.name}
              </Typography>
            </Pressable>
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
    paddingHorizontal: createSpacing(isSmallScreen ? 6 : 9),
  },
  bottomSheet_menuItemContainer: {
    flexDirection: 'row',
  },
  menuItem_root: {
    padding: createSpacing(4),
    borderRadius: themeConfig.shape.borderRadius * 2,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 96,
  },
  menuItem_langText: { textAlign: 'center' },
  menuItem_iconFlag: { width: 30, height: 30, resizeMode: 'contain', marginBottom: createSpacing(2) },
});
