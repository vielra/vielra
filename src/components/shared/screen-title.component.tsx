import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

// Core components
import { IconButton, Typography } from '@/components/core';

// Hooks
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Interfaces
import { ThemeSize } from '@/modules/theme/interfaces';

interface Props extends PropsWithChildren<ReactNode | any> {
  title: string;
  titleSize?: ThemeSize;
  enableBackButton?: boolean;
  renderRightContent?: ReactNode;
  backgroundColor?: 'paper' | 'default';
  style?: ViewStyle;
  textStyle?: TextStyle;
  backButtonStyle?: ViewStyle;
  backButtonIconStyle?: TextStyle;
}

export const ScreenTitle: FC<Props> = (props) => {
  const {
    title,
    titleSize,
    enableBackButton,
    renderRightContent,
    backgroundColor,
    style,
    textStyle,
    backButtonStyle,
    backButtonIconStyle,
  } = props;
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        {
          backgroundColor:
            backgroundColor === 'default' ? theme.palette.background.default : theme.palette.background.paper,
          ...style,
        },
      ])}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: createSpacing(3) }}>
        {enableBackButton && (
          <IconButton
            icon="arrow-back"
            iconType="ionicons"
            onPress={handleBack}
            style={StyleSheet.flatten([{ marginRight: createSpacing(2), ...backButtonStyle }])}
            iconStyle={backButtonIconStyle}
          />
        )}
        <Typography
          numberOfLines={1}
          style={StyleSheet.flatten([
            styles.title,
            titleSize === 'small' && styles.title_small,
            titleSize === 'medium' && styles.title_medium,
            titleSize === 'large' && styles.title_large,
            { ...textStyle },
          ])}>
          {title}
        </Typography>
        <View style={styles.rightContent}>{renderRightContent}</View>
      </View>
    </View>
  );
};

ScreenTitle.defaultProps = {
  backgroundColor: 'paper',
  spacingHorizontal: isSmallScreen ? 4 : 6,
  enableBackButton: true,
  titleSize: 'medium',
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: createSpacing(1),
  },
  title: {
    fontWeight: '700',
  },
  title_small: {
    fontSize: 16,
    lineHeight: 18,
  },
  title_medium: {
    fontSize: 19,
    lineHeight: 24,
  },
  title_large: {
    fontSize: 25,
    lineHeight: 30,
  },
  rightContent: {
    marginLeft: 'auto',
  },
});
