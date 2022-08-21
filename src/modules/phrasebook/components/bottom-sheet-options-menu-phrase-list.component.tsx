import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { StyleSheet, View } from 'react-native';

// Bottom sheet
import { BottomSheetModal } from '@gorhom/bottom-sheet';

// Core components
import { MenuItem } from '@/components/core';

// Components
import { BottomSheetBackdropComponent } from '@/components/shared';
import { Ionicons } from '@/components/icons';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Theme config.
import * as themeConfig from '@/modules/theme/config';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const BottomSheetOptionsMenuPhraseList: FC<Props> = ({ show, onClose }) => {
  const theme = useTheme();

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => [270], []);

  // callbacks
  const handleSheetChanges = useCallback((currentIndex: number): void => {
    console.log('currentIndex', currentIndex);
    if (currentIndex < 0) {
      onClose();
      bottomSheetRef.current?.close();
    }
  }, []);

  const renderBackdropBottomSheet = useCallback(
    (backdropProps) => (
      <BottomSheetBackdropComponent {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.75} />
    ),
    [],
  );

  useEffect(() => {
    if (show) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [show]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={show ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={styles.bottomSheet_root}
      backdropComponent={renderBackdropBottomSheet}
      // add bottom inset to elevate the sheet
      bottomInset={createSpacing(isSmallScreen ? 4 : 6)}
      // set `detached` to true
      detached={true}
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
        <View style={styles.menuContainer}>
          <MenuItem
            title="Autoplay Audio"
            enableSwitch={true}
            switchValue={false}
            onPress={() => bottomSheetRef.current?.dismiss()}
            renderStartIcon={<Ionicons name="headset-outline" size={20} />}
          />
          <MenuItem
            title="Add to Favorite"
            onPress={() => null}
            renderStartIcon={<Ionicons name="heart-outline" size={20} />}
          />
          <MenuItem
            title="Report"
            onPress={() => null}
            renderStartIcon={<Ionicons name="md-paper-plane-outline" size={20} />}
          />
          <MenuItem
            title="Settings"
            onPress={() => null}
            renderStartIcon={<Ionicons name="md-settings-outline" size={20} />}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheet_root: {
    flex: 1,
    marginHorizontal: createSpacing(isSmallScreen ? 4 : 5),
  },
  bottomSheet_backgroundStyle: {
    borderRadius: themeConfig.shape.borderRadius * 2,
  },
  bottomSheet_handleIndicatorStyle: { height: 2, width: 32 },
  bottomSheet_content: {
    flex: 1,
  },

  menuContainer: {
    flex: 1,
    marginTop: createSpacing(3),
  },
});
