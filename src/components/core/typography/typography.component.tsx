import React, { FC } from 'react';

// Base components.
import { TextBase, TextBaseProps } from '@/components/core/base';

// Interfaces.
import { IThemeTypography } from '@/modules/theme/interfaces';
import { StyleSheet } from 'react-native';

// Helper
import { getTypographyFontWeight } from './typography.helper';
import { useTheme } from '@/modules/theme/hooks';

interface Props extends TextBaseProps {
  variant?: keyof IThemeTypography;
}

export const Typography: FC<Props> = (props) => {
  const { variant, style, children, ...rest } = props;
  const theme = useTheme();

  return (
    <TextBase
      {...rest}
      style={StyleSheet.flatten([
        {
          fontSize: theme.typography[variant as keyof IThemeTypography] || theme.typography.body,
          fontWeight: getTypographyFontWeight(variant as keyof IThemeTypography),
        },
        { ...style },
      ])}>
      {children}
    </TextBase>
  );
};

Typography.defaultProps = {
  variant: 'body',
};
