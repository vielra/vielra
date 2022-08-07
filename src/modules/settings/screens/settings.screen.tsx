import { Button, Typography } from '@/components/core';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
import { RoutesConstant } from '@/constants';

// CodePush
import CodePush, { SyncStatusChangedCallback } from 'react-native-code-push';
import BottomSheet from '@gorhom/bottom-sheet';
import { createSpacing } from '@/modules/theme/utils';

// Theme config.
import * as themeConfig from '@/modules/theme/config';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

// Components
import { BottomSheetLanguage } from '@/modules/settings/components';
import { BottomSheetBackdropComponent } from '@/components/shared';
import { Ionicons } from '@/components/icons';

// Theme lib
import { blue, green, grey, red } from '@/modules/theme/libs';

// Utils
import { isSmallScreen } from '@/utils';

export const SettingScreen: FC = (props) => {
  const theme = useTheme();

  const [codePushSyncStatusText, setCodePushSyncStatusText] = useState<string | undefined>('');
  const [codePushSyncStatus, setCodePushSyncStatus] = useState<CodePush.SyncStatus | undefined>();

  const [bottomSheetLanguageIndex, setBottomSheetLanguageIndex] = useState<number>(-1);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [180], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number): void => {
    if (index === 0) {
      // 0 is appear

      CodePush.sync(
        {
          // updateDialog: false, // jika di set ke false download akan dilakukan secara diam-diam
          updateDialog: {
            title: 'Update tersedia',
          },
          installMode: CodePush.InstallMode.IMMEDIATE,
        },
        syncStatusChangedCallback,
      );
    } else if (index === -1) {
      setCodePushSyncStatusText(undefined);
      setCodePushSyncStatus(undefined);
    }
    null;
  }, []);

  // const handleOpenBottomSheet = (): void => {
  //   bottomSheetRef.current?.expand();
  // };

  /**
   * Handle sync update
   */
  const handleSyncUpdate = (): void => {
    bottomSheetRef.current?.expand();
  };

  /**
   * Handle check for updates
   * @returns {Promise<void>}
   */
  const handleCheckForUpdates = async (): Promise<void> => {
    const response = await CodePush.checkForUpdate();
    if (response) {
      // There is update available
      console.log('response', response);
    } else {
      // If there is no update response will be null
    }
  };

  const syncStatusChangedCallback = (status: CodePush.SyncStatus): void => {
    setCodePushSyncStatus(status);
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setCodePushSyncStatusText('Checking for update...');
        break;
      case CodePush.SyncStatus.SYNC_IN_PROGRESS:
        setCodePushSyncStatusText('Sync in progress...');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setCodePushSyncStatusText('App is update!');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setCodePushSyncStatusText('Downloading update...');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setCodePushSyncStatusText('Update installed');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setCodePushSyncStatusText('Update ignored');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setCodePushSyncStatusText('Awaiting user action');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setCodePushSyncStatusText('Installing update...');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setCodePushSyncStatusText('Failed check update!');
        break;
      default:
        setCodePushSyncStatusText(undefined);
        break;
    }
  };

  const renderBackdropBottomSheet = useCallback(
    (backdropProps) => <BottomSheetBackdropComponent {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  const renderCodePushSyncStatusIcon = (status: CodePush.SyncStatus) => {
    const iconSize = 54;
    switch (status) {
      case CodePush.SyncStatus.SYNC_IN_PROGRESS:
        return (
          <Ionicons
            name="sync-circle"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: blue[500] }])}
          />
        );

      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        return (
          <Ionicons
            name="sync-circle"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: blue[500] }])}
          />
        );

      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        return (
          <Ionicons
            name="cloud-download"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: blue[500] }])}
          />
        );

      case CodePush.SyncStatus.UPDATE_INSTALLED:
        return (
          <Ionicons
            name="checkmark-circle"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: blue[500] }])}
          />
        );

      case CodePush.SyncStatus.UNKNOWN_ERROR:
        return (
          <Ionicons
            name="cloud-offline"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: grey[400] }])}
          />
        );

      case CodePush.SyncStatus.INSTALLING_UPDATE:
        return (
          <Ionicons
            name="sync-circle"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: blue[500] }])}
          />
        );

      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        return (
          <Ionicons
            name="time"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: blue[500] }])}
          />
        );

      case CodePush.SyncStatus.UPDATE_IGNORED:
        return (
          <Ionicons
            name="close-circle"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: red[500] }])}
          />
        );

      case CodePush.SyncStatus.UP_TO_DATE:
        return (
          <Ionicons
            name="checkmark-done-circle"
            size={iconSize}
            style={StyleSheet.flatten([styles.codePush_syncIcon, { color: green[600] }])}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Settings</Typography>

        <Button
          onPress={() => props.navigation.navigate(RoutesConstant.BottomTab.Phrasebook)}
          variant="text"
          title="Go to phaasebook screen"
        />

        {/* Check for update */}
        <Button
          variant="contained"
          color="secondary"
          onPress={handleSyncUpdate}
          title="Sync Update"
          style={{ marginBottom: createSpacing(3) }}
        />
        <Button
          variant="contained"
          color="primary"
          onPress={handleCheckForUpdates}
          title="Check for updates"
          style={{ marginBottom: createSpacing(4) }}
        />

        <Button
          variant="outlined"
          color="secondary"
          onPress={() => setBottomSheetLanguageIndex(0)}
          title="Change Language"
          rounded
        />
      </ScrollView>

      {/* Bottom sheet language */}
      <BottomSheetLanguage index={bottomSheetLanguageIndex} setIndex={(index) => setBottomSheetLanguageIndex(index)} />

      {/* Bottom sheet CodePush update */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
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
          {renderCodePushSyncStatusIcon(codePushSyncStatus as CodePush.SyncStatus)}
          <Typography
            style={StyleSheet.flatten([
              styles.codePush_syncStatusText,
              {
                ...(codePushSyncStatus === CodePush.SyncStatus.UP_TO_DATE && {
                  color: green[600],
                }),
              },
            ])}>
            {codePushSyncStatusText}
          </Typography>
        </View>
      </BottomSheet>
    </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: createSpacing(isSmallScreen ? 4 : 6),
  },

  codePush_syncIcon: { marginBottom: createSpacing(2) },
  codePush_syncStatusText: { fontSize: 16, fontWeight: '600' },
});
