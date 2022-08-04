import { useTheme } from '@/modules/theme/hooks';
import { IThemeBackgroundPalette } from '@/modules/theme/interfaces';
import { createSpacing } from '@/modules/theme/utils';
import React, { FC } from 'react';

// RN
import { StyleSheet, ViewProps, ViewStyle } from 'react-native';

// Hooks.
import { ViewBase } from '@/components/core/base';

interface Props extends Omit<ViewProps, 'style'> {
  spacing?: number;
  backgroundTypeColor?: keyof IThemeBackgroundPalette;
  style?: ViewStyle;
}

export const MainLayout: FC<Props> = (props) => {
  const { children, spacing, backgroundTypeColor, style } = props;

  const theme = useTheme();

  const backgroundColor =
    backgroundTypeColor === 'paper' ? theme.palette.background.paper : theme.palette.background.default;

  return (
    <ViewBase
      style={StyleSheet.flatten([
        styles.root,
        {
          paddingHorizontal: createSpacing(spacing as number),
          backgroundColor,
          ...style,
        },
      ])}>
      {children}
    </ViewBase>
  );
};

MainLayout.defaultProps = {
  spacing: 4,
  backgroundTypeColor: 'default',
};

const styles = StyleSheet.create({
  root: {},
});
