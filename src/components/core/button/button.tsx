import React, { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

// base components.
import { BaseButton, BaseButtonProps } from '@/components/base';

// theme lib
import { common, grey } from '@/modules/theme/libs/palette';

// icon components.
import { FeatherIcon, Ionicons, MaterialCommunityIcon, MaterialIcon } from '@/components/core/icons';

// utils
import { themeUtils } from '@/modules/theme/utilities';

// Interfaces.
import { AdornmentIconTypeButton, ButtonColor, ButtonVariant } from './button.interface';

// hooks
import { useTheme } from '@/modules/theme/hooks';

// config
import { themeConfig } from '@/modules/theme/configs';
import { appConfig } from '@/modules/app/configs';

export interface CoreButtonProps extends BaseButtonProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  rounded?: boolean;
  startIcon?: string;
  endIcon?: string;
  iconType?: AdornmentIconTypeButton;
  isLoading?: boolean;
  disablePadding?: boolean;
}

const Button: FC<CoreButtonProps> = (props): JSX.Element => {
  const { variant, rounded, color, isLoading, style, startIcon, endIcon, iconType, disablePadding, ...rest } = props;
  const { palette } = useTheme();

  const renderSpinner = (): ReactElement => {
    let spinnerSize = 0;
    switch (props.size) {
      case 'small':
        spinnerSize = 12;
        break;
      case 'medium':
        spinnerSize = 16;
        break;
      case 'large':
        spinnerSize = 18;
        break;
      case 'extra-large':
        spinnerSize = 20;
        break;
      default:
        spinnerSize = 16;
        break;
    }
    return (
      <ActivityIndicator
        style={styles.spinnerStyle}
        size={spinnerSize}
        color={
          variant === 'contained'
            ? themeUtils.getContrastTextColor(color as ButtonColor, palette)
            : themeUtils.getMainColor(color as ButtonColor, palette)
        }
      />
    );
  };

  const renderIcon = (placement: 'start' | 'end'): ReactNode => {
    const getIconSize = () => {
      if (props.size === 'small') {
        return 16;
      }
      if (props.size === 'medium') {
        return 18;
      }
      if (props.size === 'large') {
        return 20;
      }
      if (props.size === 'extra-large') {
        return 22;
      }
      return 18;
    };
    if (iconType === 'Ioniconss') {
      return (
        <Ionicons
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeUtils.getContrastTextColor(color as ButtonColor, palette)
              : themeUtils.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else if (iconType === 'material-community-icons') {
      return (
        <MaterialCommunityIcon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeUtils.getContrastTextColor(color as ButtonColor, palette)
              : themeUtils.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else if (iconType === 'material-icons') {
      return (
        <MaterialIcon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeUtils.getContrastTextColor(color as ButtonColor, palette)
              : themeUtils.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else if (iconType === 'feather') {
      return (
        <FeatherIcon
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? themeUtils.getContrastTextColor(color as ButtonColor, palette)
              : themeUtils.getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <BaseButton
      /**
       * Button styles.
       */
      style={StyleSheet.flatten([
        styles.buttonRoot,
        {
          // Rounded button
          ...(rounded && {
            borderRadius: 50,
          }),

          // Button color for variant contained
          ...(variant === 'contained' && {
            // prettier-ignore
            backgroundColor: themeUtils.getMainColor(color as ButtonColor, palette),
            // prettier-ignore
            borderColor: themeUtils.getMainColor(color as ButtonColor, palette),
          }),

          // Button color for variant outlined
          // prettier-ignore
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            borderColor: themeUtils.getMainColor(color as ButtonColor, palette),
          }),

          // Button color for variant text
          ...(variant === 'text' && {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            ...(disablePadding && { paddingHorizontal: 0, height: 'auto' }),
          }),

          // Button style for disabled button
          ...(props.disabled && {
            backgroundColor: palette.mode === 'light' ? grey[300] : grey[900],
            borderColor: palette.mode === 'light' ? grey[300] : grey[900],
          }),
        },
        { ...style },
      ])}
      /**
       * Pressed style
       */
      pressedStyle={StyleSheet.flatten([
        {
          // Pressed button color for variant contained
          ...(variant === 'contained' && {
            // prettier-ignore
            backgroundColor: themeUtils.getDarkenColor(color as ButtonColor, palette),
            // prettier-ignore
            borderColor: themeUtils.getDarkenColor(color as ButtonColor, palette),
          }),

          // Pressed button color for variant outlined
          ...(variant === 'outlined' && {
            backgroundColor:
              palette.mode === 'light'
                ? themeUtils.getLightenColor(color as ButtonColor, palette)
                : 'rgba(255, 255, 255, 0.1)',
          }),

          // Button color for variant text
          ...(variant === 'text' && {
            opacity: 0.75,
          }),

          // Pressed button color for variant text
          // ...(variant === 'text' && {
          //   backgroundColor: 'transparent',
          // }),
        },
        { ...style },
      ])}
      /**
       * Button text style
       */
      textStyle={StyleSheet.flatten([
        styles.buttonTextStyle,
        {
          /* I don't need spacing in typography anymore. */
          // ...(startIcon && {
          //   marginLeft: createSpacing(1.8),
          // }),
          // ...(endIcon && {
          //   marginRight: createSpacing(1.8),
          // }),

          // Text button color for variant button outlined
          ...(variant === 'outlined' && {
            color: themeUtils.getMainColor(color as ButtonColor, palette),
          }),

          // Text button color for variant button text
          ...(variant === 'text' && {
            color: themeUtils.getMainColor(color as ButtonColor, palette),
          }),

          ...(props.disabled && {
            color: palette.mode === 'light' ? grey[500] : grey[600],
          }),
        },
      ])}
      /**
       * Start & End Adornment
       */
      renderStartAdornment={isLoading ? renderSpinner() : startIcon && renderIcon('start')}
      renderEndAdornment={endIcon && renderIcon('end')}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  buttonRoot: {
    borderWidth: 1.2,
    borderStyle: 'solid',
  },
  buttonTextStyle: {
    color: common.white,
    fontWeight: themeConfig.typography.button.fontWeightMedium,
  },
  spinnerStyle: {
    marginRight: themeUtils.createSpacing(1.5),
  },
  iconButtonPlacementLeft: {
    marginRight: themeUtils.createSpacing(1.6),
  },
  iconButtonPlacementRight: {
    marginLeft: themeUtils.createSpacing(1.6),
  },
});

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  rounded: false,
  variant: 'contained',
  isLoading: false,
  startIcon: undefined,
  endIcon: undefined,
  iconType: appConfig.defaultVectorIcon as AdornmentIconTypeButton,
  disablePadding: false,
};

export default Button;
