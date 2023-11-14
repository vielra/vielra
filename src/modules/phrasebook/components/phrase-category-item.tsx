import React, { FC, useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

// core components.
import { Divider, Typography } from '@/components/core';

// utils
import { createSpacing, themeUtils } from '@/modules/theme/utilities';
import { useNavigation } from '@react-navigation/native';

// interfaces
import { NavigationProps } from '@/navigators';
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';

// components
import { Ionicons } from '@/components/core';

// theme config
import { themeConfig } from '@/modules/theme/configs';

// hooks.
import { useTheme } from '@/modules/theme/hooks';

interface Props {
  item: IPhraseCategory;
  onPress?: (item: IPhraseCategory) => void;
}
export const PhraseCategoryItem: FC<Props> = ({ item, onPress }) => {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProps>();

  const handlePress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(item);
    } else {
      navigation.navigate('phrase_list_screen', { category: item });
    }
  }, [item]);

  return (
    <View style={StyleSheet.flatten([styles.root, { backgroundColor: theme.palette.background.paper }])}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) =>
          StyleSheet.flatten([
            styles.pressable,
            { backgroundColor: pressed ? item.color || theme.palette.primary.main : theme.palette.background.paper },
          ])
        }>
        {({ pressed }) => (
          <View style={styles.container}>
            <View
              style={StyleSheet.flatten([
                styles.iconBox,
                {
                  backgroundColor: item.color ?? theme.palette.secondary.main,
                },
              ])}>
              <Ionicons name='bookmarks' size={20} style={StyleSheet.flatten([styles.iconStyle, {}])} />
            </View>
            <View>
              <Typography
                variant='h5'
                gutterBottom
                fontWeight='bold'
                style={StyleSheet.flatten([
                  styles.textStyle,
                  {
                    color: item.color || theme.palette.secondary.main,
                    ...(pressed && {
                      color: theme.palette.primary.contrastText,
                    }),
                  },
                ])}>
                {item.name.en}
              </Typography>
              <Typography
                style={{
                  color: theme.palette.text.secondary,
                  ...(pressed && {
                    color: theme.palette.primary.contrastText,
                  }),
                }}
                variant='subtitle1'>{`Learn ${item.phrases_count} phrases about ${item.name.en}`}</Typography>
            </View>

            {item.phrases_count > 0 && (
              <View style={styles.badgePhraseCount}>
                <Typography style={styles.textCount} variant='subtitle2'>
                  {item.phrases_count}
                </Typography>
              </View>
            )}
          </View>
        )}
      </Pressable>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // marginBottom: createSpacing(3),
  },
  pressable: {
    // borderRadius: themeConfig.shape.borderRadius,
    paddingVertical: createSpacing(4),
    paddingHorizontal: themeConfig.horizontalSpacing,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    height: 48,
    width: 48,
    borderRadius: 48,
    marginRight: createSpacing(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#ffffff',
  },
  textStyle: {},
  badgePhraseCount: {
    marginLeft: 'auto',
    height: 22,
    minWidth: 22,
    paddingHorizontal: 6,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: themeConfig.paletteBase.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCount: {
    color: '#ffffff',
  },
});
