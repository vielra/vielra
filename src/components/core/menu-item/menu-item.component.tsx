import React, { FC, ReactElement, ReactNode, useMemo } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Switch } from 'react-native';

// Core components
import { Typography } from '@/components/core';

// import { PaletteMode } from '@/interfaces/theme';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

// Theme libs
import { grey } from '@/modules/theme/libs';

// Utils
import { createSpacing, isDarkMode } from '@/modules/theme/utils';

interface Props {
  title?: string;
  enableBackButton?: boolean;
  enableSwitch?: boolean;
  switchValue?: boolean;
  onPress?: () => void;
  renderStartIcon?: ReactElement | ReactNode;
}

export const MenuItem: FC<Props> = ({ title, enableSwitch, switchValue, onPress, renderStartIcon }: Props) => {
  const theme = useTheme();

  const [rippleColor] = useMemo(() => (isDarkMode(theme) ? grey[500] : grey[200]), [theme.palette]);

  return (
    <View style={styles.root}>
      <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View style={styles.touchableInner}>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderStartIcon}
              <Typography
                numberOfLines={1}
                style={StyleSheet.flatten([
                  styles.textStyle,
                  { marginLeft: renderStartIcon ? createSpacing(6) : 0, color: theme.palette.text.primary },
                ])}>
                {title}
              </Typography>
            </View>
            {enableSwitch && (
              <Switch
                trackColor={{ false: grey[400], true: theme.palette.primary.light }}
                thumbColor={switchValue ? theme.palette.primary.main : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onPress}
                value={switchValue}
              />
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  touchableInner: {
    flexGrow: 1,
    height: 50,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: createSpacing(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Be Vietnam Pro',
  },
});

MenuItem.defaultProps = {
  title: undefined,
  enableSwitch: false,
  switchValue: false,
};
