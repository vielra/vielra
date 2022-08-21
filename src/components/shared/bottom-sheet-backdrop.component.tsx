import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

// Bottom sheet backdrop
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Interfaces
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

// Theme lib
// import { indigo } from '@/modules/theme/libs';

interface Props extends BottomSheetDefaultBackdropProps {}

export const BottomSheetBackdropComponent: FC<Props> = (props) => {
  return <BottomSheetBackdrop {...props} style={[StyleSheet.absoluteFill, styles.backdrop_root]} />;
};

BottomSheetBackdropComponent.defaultProps = {
  opacity: 0.6,
};

const styles = StyleSheet.create({
  backdrop_root: {
    // backgroundColor: indigo.A100,
    backgroundColor: '#101229',
  },
});
