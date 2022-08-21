import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

// Core components.
import { Typography } from '@/components/core';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { useNavigation } from '@react-navigation/native';

// Interface
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';
import { RoutesConstant } from '@/constants';

// Components
import DropShadow from 'react-native-drop-shadow';
import { Ionicons } from '@/components/icons';

// Theme config
import * as themConfig from '@/modules/theme/config';

// Hooks.
import { useTheme } from '@/modules/theme/hooks';

interface Props {
  item: IPhraseCategory;
}
export const PhraseCategoryItem: FC<Props> = ({ item }) => {
  const theme = useTheme();

  const navigation = useNavigation();

  const handlePress = (): void => {
    navigation.navigate(RoutesConstant.PhrasebookStack.PhraseListScreen as never, { category: item } as never);
  };

  return (
    <DropShadow style={styles.root}>
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
            <Ionicons
              name="ios-bookmarks"
              size={24}
              style={StyleSheet.flatten([
                styles.iconStyle,
                {
                  color: item.color || theme.palette.secondary.main,
                  ...(pressed && {
                    color: theme.palette.primary.contrastText,
                  }),
                },
              ])}
            />
            <View>
              <Typography
                variant="h5"
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
                variant="subtitle2"
                style={StyleSheet.flatten([
                  styles.textCount,
                  {
                    color: theme.palette.text.disabled,
                    ...(pressed && {
                      color: theme.palette.primary.contrastText,
                    }),
                  },
                ])}>
                {item.phrases_count + ' phrases'}
              </Typography>
            </View>
          </View>
        )}
      </Pressable>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: createSpacing(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  pressable: {
    borderRadius: themConfig.shape.borderRadius,
    paddingHorizontal: createSpacing(5),
    paddingVertical: createSpacing(4),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    marginRight: createSpacing(3),
  },
  textStyle: {},
  textCount: {},
});
