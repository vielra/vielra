import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, TextInput, TextInputProps, TextStyle } from 'react-native';

// theme config.
import { themeConfig, theme_shape } from '@/modules/theme/configs';

// core components.
import { Typography } from '@/components/core';

// hooks
import { useTheme } from '@/modules/theme/hooks';

// theme libs.
import { grey, red } from '@/modules/theme/libs';

// interfaces
import { IThemePalette, ThemeSize } from '@/modules/theme/interfaces';

// helpers / utils.
import { createSpacing, themeUtils } from '@/modules/theme/utilities';

export type TextFieldVariant = 'filled' | 'outlined';

export type TextFieldColor = keyof Pick<IThemePalette, 'primary' | 'secondary'>;

export type TextFieldSize = ThemeSize | 'extra-large';

export const TEXT_FIELD_SMALL_HEIGHT = 36;
export const TEXT_FIELD_MEDIUM_HEIGHT = 42;
export const TEXT_FIELD_LARGE_HEIGHT = 50;
export const TEXT_FIELD_EXTRA_LARGE_HEIGHT = 56;

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  size?: TextFieldSize;
  margin?: 'none' | 'dense' | 'normal';
  variant?: TextFieldVariant;
  rounded?: boolean;
  color?: TextFieldColor;
  label?: string;
  labelSize?: ThemeSize;
  labelStyle?: TextStyle;
  style?: TextStyle;
  isError?: boolean;
  isValid?: boolean;
  helperText?: string | null;
  fullWidth?: boolean;
  rows?: number;
  maxRows?: number;
}

const TextField: FC<TextFieldProps> = (props): JSX.Element => {
  const {
    size,
    margin,
    variant,
    rounded,
    style,
    label,
    labelSize,
    labelStyle,
    isError,
    isValid,
    helperText,
    multiline,
    rows,
    maxRows,
    ...rest
  } = props;
  const { palette } = useTheme();

  const isDarkMode = palette.mode === 'dark';

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [isFocused]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, [isFocused]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.textInput_root,
        // prettier-ignore
        {...(margin === 'none' && { marginBottom: 0 })},
        // prettier-ignore
        {...(margin === 'dense' && { marginBottom: themeUtils.createSpacing(2) })},
        // prettier-ignore
        {...(margin === 'normal' && { marginBottom: themeUtils.createSpacing(3) })},
      ])}>
      {/* --- input label --- */}
      {label && (
        <Typography
          style={StyleSheet.flatten([
            styles.label,
            { ...(labelSize === 'small' && styles.label_small) },
            { ...(labelSize === 'medium' && styles.label_medium) },
            { ...(labelSize === 'large' && styles.label_large) },
            {
              color: palette.text.secondary,
              fontWeight: '400',
              ...labelStyle,
            },
          ])}>
          {label}
        </Typography>
      )}

      {/* text input */}
      <TextInput
        {...rest}
        placeholderTextColor={palette.text.disabled}
        onFocus={handleFocus}
        onEndEditing={handleBlur}
        multiline={multiline}
        style={StyleSheet.flatten([
          styles.textInputBase,
          {
            color: palette.text.primary,
            ...style,
          },
          // rounded
          // prettier-ignore
          { ...(rounded && size === 'small' && { borderRadius: TEXT_FIELD_SMALL_HEIGHT }) },
          // prettier-ignore
          { ...(rounded && size === 'medium' && { borderRadius: TEXT_FIELD_MEDIUM_HEIGHT }) },
          // prettier-ignore
          { ...(rounded && size === 'large' && { borderRadius: TEXT_FIELD_LARGE_HEIGHT }) },
          // prettier-ignore
          { ...(rounded && size === 'extra-large' && { borderRadius: TEXT_FIELD_EXTRA_LARGE_HEIGHT }) },

          // text input style
          { ...(size === 'small' && !multiline && styles.textInput_small) },
          { ...(size === 'medium' && !multiline && styles.textInput_medium) },
          { ...(size === 'large' && !multiline && styles.textInput_large) },
          { ...(size === 'extra-large' && !multiline && styles.textInput_extraLarge) },

          // text input style multiline
          // prettier-ignore
          { ...(size === 'small' && multiline && {
            minHeight: Number(rows) * 21,
            maxHeight: Number(maxRows) * 21,
          }) },
          // prettier-ignore
          { ...(size === 'medium' && multiline && {
            minHeight: Number(rows) * 24,
            maxHeight: Number(maxRows) * 24,
          }) },
          // prettier-ignore
          { ...(size === 'large' && multiline && {
            minHeight: Number(rows) * 26,
            maxHeight: Number(maxRows) * 26,
          }) },
          // prettier-ignore
          { ...(size === 'extra-large' && multiline && {
            minHeight: Number(rows) * 28,
            maxHeight: Number(maxRows) * 28,
          }) },

          // prettier-ignore
          { ...(size === 'small' && multiline && styles.textInput_smallMultiline) },
          // prettier-ignore
          { ...(size === 'medium' && multiline && styles.textInput_mediumMultiline) },
          // prettier-ignore
          { ...(size === 'large' && multiline && styles.textInput_largeMultiline) },
          // prettier-ignore
          { ...(size === 'extra-large' && multiline && styles.textInput_extraLargeMultiline) },

          // styles for variant outlined
          // prettier-ignore
          {
            ...(variant === 'outlined' && props.editable && {
              backgroundColor: palette.background.paper,
              borderColor: palette.divider,
            }),
          },

          // Styles for variant outlined disabled.
          // prettier-ignore
          { ...(variant === 'outlined' && !props.editable && {
            backgroundColor: !isDarkMode ? grey[100] : grey[900],
            borderColor: !isDarkMode ? grey[200] : grey[900],
            color: palette.text.disabled,
          })},

          // Styles for variant outlined focused.
          // prettier-ignore
          {...(isFocused && variant === 'outlined' && { borderColor: palette.primary.main })},

          // Styles for variant outlined error.
          // prettier-ignore
          {...(variant === 'outlined' && isError && {
            borderColor: red[500],
            color: red[600],
          })},

          // Styles for variant outlined error focused
          // prettier-ignore
          {...(isFocused && variant === 'outlined' && isError && {
            borderColor: red[500],
            color: red[600],
          })},

          // Styles for variant outlined invalid.
          // prettier-ignore
          {...(variant === 'outlined' && isValid && {
            borderColor: palette.success.main,
            color: palette.success.dark,
          })},

          // Styles for variant filled
          // prettier-ignore
          {...(variant === 'filled' && {
            backgroundColor: !isDarkMode ? '#efefef' : grey[900],
            borderColor: !isDarkMode ? '#efefef' : grey[900],
          })},

          // Styles for variant filled disabled.
          // prettier-ignore
          {...(variant === 'filled' && !props.editable && {
            backgroundColor: !isDarkMode ? grey[300] : grey[800],
            borderColor: !isDarkMode ? grey[300] : grey[800],
            color: palette.text.disabled,
          })},

          // Styles for variant filled error.
          // prettier-ignore
          {...(variant === 'filled' && isError && {
            backgroundColor: 'rgba(255, 0, 0, 0.05)',
            borderColor: red[500],
            color: red[600],
          })},

          // Styles for variant filled invalid.
          // prettier-ignore
          {...(variant === 'filled' && isValid && {
            backgroundColor: palette.success.light,
            borderColor: palette.success.main,
            color: palette.success.dark,
          })},
        ])}
      />

      {/* --- Helper text --- */}
      {helperText && (
        <Typography
          style={StyleSheet.flatten([
            styles.helperText,
            {
              color: isError ? red[500] : palette.text.secondary,
            },
          ])}
          variant='body2'>
          {helperText}
        </Typography>
      )}
    </View>
  );
};

TextField.defaultProps = {
  size: 'medium',
  margin: 'normal',
  variant: 'outlined',
  rounded: false,
  color: 'primary',
  labelSize: 'small',
  editable: true,
  isError: false,
  isValid: false,
  helperText: undefined,
  multiline: false,
  rows: 2,
  maxRows: 8,
};

const styles = StyleSheet.create({
  textInput_root: {},

  textInputBase: {
    borderWidth: 1.3,
    borderRadius: theme_shape.borderRadius,
    fontWeight: themeConfig.typography.body1.fontWeightMedium,
    fontFamily: themeConfig.typography.body1.fontFamily,
  },

  textInput_small: {
    height: TEXT_FIELD_SMALL_HEIGHT,
    fontSize: 12.2,
    lineHeight: 16.4,
    paddingHorizontal: themeUtils.createSpacing(3),
  },
  textInput_medium: {
    height: TEXT_FIELD_MEDIUM_HEIGHT,
    fontSize: 13.8,
    lineHeight: 17.4,
    paddingHorizontal: themeUtils.createSpacing(3.6),
  },
  textInput_large: {
    height: TEXT_FIELD_LARGE_HEIGHT,
    fontSize: 15.2,
    lineHeight: 18.4,
    paddingHorizontal: themeUtils.createSpacing(4.4),
  },
  textInput_extraLarge: {
    height: TEXT_FIELD_EXTRA_LARGE_HEIGHT,
    fontSize: 16.2,
    lineHeight: 19.2,
    paddingHorizontal: themeUtils.createSpacing(4.4),
  },

  textInput_smallMultiline: {
    // minHeight: TEXT_FIELD_SMALL_HEIGHT,
    fontSize: 12,
    paddingHorizontal: themeUtils.createSpacing(3),
    paddingTop: createSpacing(2.6),
    paddingBottom: createSpacing(2.6),
    textAlignVertical: 'top',
  },
  textInput_mediumMultiline: {
    // minHeight: TEXT_FIELD_MEDIUM_HEIGHT,
    fontSize: 13.8,
    paddingHorizontal: themeUtils.createSpacing(3.6),
    paddingTop: createSpacing(2.8),
    paddingBottom: createSpacing(2.8),
    textAlignVertical: 'top',
  },
  textInput_largeMultiline: {
    // minHeight: TEXT_FIELD_LARGE_HEIGHT,
    fontSize: 15,
    paddingHorizontal: themeUtils.createSpacing(4.4),
    paddingTop: createSpacing(3),
    paddingBottom: createSpacing(3),
    textAlignVertical: 'top',
  },
  textInput_extraLargeMultiline: {
    // minHeight: TEXT_FIELD_EXTRA_LARGE_HEIGHT,
    fontSize: 16,
    paddingHorizontal: themeUtils.createSpacing(4.4),
    paddingTop: createSpacing(3.2),
    paddingBottom: createSpacing(3.2),
    textAlignVertical: 'top',
  },

  label: {
    marginBottom: themeUtils.createSpacing(1),
  },
  label_small: {
    fontSize: 11,
  },
  label_medium: {
    fontSize: 13,
  },
  label_large: {
    fontSize: 15,
  },
  helperText: {
    fontSize: themeConfig.typography.subtitle1.fontSize,
    marginLeft: themeUtils.createSpacing(2),
    fontWeight: themeConfig.typography.body1.fontWeightMedium,
  },
});

export default TextField;
