import React, { FC } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

// Core components
import { Typography } from '@/components/core';

// Assets
import { InboxIcon } from '@/assets';

// Utils
import { createSpacing } from '@/modules/theme/utils';

interface Props {
  title?: string;
  subtitle?: string;
  height?: number;
  style?: ViewStyle;
}

export const EmptyState: FC<Props> = (props) => {
  const { title, subtitle, height, style } = props;
  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        {
          height,
          ...style,
        },
      ])}>
      <Image source={InboxIcon} style={styles.icon} />
      <Typography style={styles.textTitle} numberOfLines={1}>
        {title}
      </Typography>
      {subtitle && <Typography style={styles.textSubtitle}>{subtitle}</Typography>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 15,
  },
  textSubtitle: {},
  icon: {
    height: 72,
    width: 72,
    resizeMode: 'contain',
    opacity: 0.4,
    marginBottom: createSpacing(2),
  },
});

EmptyState.defaultProps = {
  title: 'No data',
  subtitle: undefined,
  height: undefined,
};
