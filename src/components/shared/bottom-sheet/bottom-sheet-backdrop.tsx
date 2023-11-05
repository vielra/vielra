import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

// bottom sheet backdrop
import { BottomSheetBackdrop as BaseBackdrop } from '@gorhom/bottom-sheet';

// interfaces
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useTheme } from '@/modules/theme/hooks';

interface Props extends BottomSheetDefaultBackdropProps {
  // ...another props
}

const BottomSheetBackdrop: FC<Props> = (props) => {
  const { isDarkMode } = useTheme();
  return (
    <BaseBackdrop
      opacity={isDarkMode ? 0.92 : 0.75}
      {...props}
      style={[StyleSheet.absoluteFill, styles.backdrop_root]}
    />
  );
};

BottomSheetBackdrop.defaultProps = {
  opacity: 0.75,
  pressBehavior: 'close',
  appearsOnIndex: 0,
  disappearsOnIndex: -1,
};

const styles = StyleSheet.create({
  backdrop_root: {
    backgroundColor: '#000000',
  },
});

export default BottomSheetBackdrop;
