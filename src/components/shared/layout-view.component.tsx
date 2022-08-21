import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

// Hooks
// import { useTheme } from '@/modules/theme/hooks';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { isSmallScreen } from '@/utils';

interface Props extends PropsWithChildren<ReactNode | any> {
  style?: ViewStyle;
  spacingHorizontal?: number;
}

export const LayoutView: FC<Props> = (props) => {
  const { children, spacingHorizontal, style } = props;
  return (
    <View
      style={{
        paddingHorizontal: createSpacing(Number(spacingHorizontal)),
        ...style,
      }}>
      {children}
    </View>
  );
};

LayoutView.defaultProps = {
  backgroundColor: 'paper',
  spacingHorizontal: isSmallScreen ? 4 : 6,
};
