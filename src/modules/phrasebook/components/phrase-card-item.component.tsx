import React, { FC, memo, useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

// Core components.
import { IconButton, Typography } from '@/components/core';

// Constants
import { AppLanguage } from '@/modules/localization';

// Utils
import { createSpacing } from '@/modules/theme/utils';

// Components
import DropShadow from 'react-native-drop-shadow';
import { Ionicons } from '@/components/icons';

// Assets components
import { FlagIndonesia, FlagUS, FlagVietnam } from '@/assets';

// Action creators
import { phrasebook_actionDeletePhrase } from '@/modules/phrasebook/redux';

// Theme lib
import { blue } from '@/modules/theme/libs';

// Theme config.
import * as themConfig from '@/modules/theme/config';

// Hooks.
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';

// Interface
import { IPhrase } from '@/modules/phrasebook/interfaces';

interface Props {
  item: IPhrase;
  isSelected: boolean;
  onSelect: (phraseId: string) => void;
  isSelectionMode: boolean;
}
export const PhraseCardItem: FC<Props> = memo((props) => {
  const { item, isSelected, onSelect, isSelectionMode } = props;

  const dispatch = useDispatch();
  const theme = useTheme();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handlePress = useCallback(() => {
    if (isSelectionMode) {
      if (isSelected) {
        onSelect(item.id);
      } else {
        onSelect(item.id);
      }
    } else {
      setExpanded(!expanded);
    }
  }, [isSelectionMode]);

  const handleLongPress = (): void => {
    onSelect(item.id);
  };

  const handleDelete = (): void => {
    dispatch(phrasebook_actionDeletePhrase([item.id]));
  };

  const renderIconFlag = (lang: AppLanguage['code']) => {
    let flag;
    switch (lang) {
      case 'vi':
        flag = FlagVietnam;
        break;
      case 'en':
        flag = FlagUS;
        break;
      case 'id':
        flag = FlagIndonesia;
        break;
      default:
        flag = undefined;
        break;
    }

    return <Image source={flag} style={styles.phrase_iconFlag} />;
  };

  const renderCheckedBadge = () => {
    return (
      <DropShadow style={styles.badgeCheckedRoot}>
        <View style={styles.badgeChecked}>
          <View>
            <Ionicons name="ios-checkmark" color={theme.palette.common.white} size={15} />
          </View>
        </View>
      </DropShadow>
    );
  };

  return (
    <DropShadow
      style={StyleSheet.flatten([
        styles.root,
        {
          ...(expanded && {
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
          }),
        },
      ])}>
      {isSelected && renderCheckedBadge()}
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={({ pressed }) =>
          StyleSheet.flatten([
            styles.pressable,
            {
              backgroundColor: theme.palette.background.paper,
              borderColor: isSelected ? blue[500] : 'transparent',
            },
          ])
        }>
        {({ pressed }) => (
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <View style={StyleSheet.flatten([styles.phraseTextContainer])}>
                {renderIconFlag('vi')}
                <Typography style={StyleSheet.flatten([styles.phraseText, { fontWeight: '600' }])}>
                  {item.text.vi}
                </Typography>
              </View>
              <View style={styles.phraseTextContainer}>
                {renderIconFlag('id')}
                <Typography style={StyleSheet.flatten([styles.phraseText])}>{item.text.id}</Typography>
              </View>

              <View style={styles.phraseTextContainer}>
                {renderIconFlag('en')}
                <Typography style={StyleSheet.flatten([styles.phraseText])}>{item.text.en}</Typography>
              </View>

              {expanded && (
                <View>
                  <View
                    style={StyleSheet.flatten([
                      styles.hiddenFooter,
                      {
                        borderTopColor: theme.palette.divider,
                      },
                    ])}>
                    <View style={styles.hiddenFooterLeftContent}>
                      <IconButton
                        onPress={handleDelete}
                        icon="trash"
                        iconType="ionicons"
                        iconStyle={{ color: theme.palette.text.disabled }}
                      />
                    </View>
                    <View style={styles.hiddenFooterRightContent}>
                      <IconButton icon="heart" iconType="ionicons" iconStyle={{ color: theme.palette.text.disabled }} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </DropShadow>
  );
});

const styles = StyleSheet.create({
  root: {
    marginBottom: createSpacing(2.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  pressable: {
    borderRadius: themConfig.shape.borderRadius,
    paddingHorizontal: createSpacing(5),
    paddingVertical: createSpacing(4),
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  container: {},

  iconStyle: {
    marginRight: createSpacing(3),
  },

  phraseText: {
    // lineHeight: 20,
  },
  textCount: {},
  phraseTextContainer: {
    flexDirection: 'row',
    marginBottom: createSpacing(2),
    marginRight: createSpacing(3),
  },
  phrase_iconFlag: {
    height: 16,
    width: 16,
    marginRight: createSpacing(2),
    marginTop: 4,
  },
  hiddenFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: createSpacing(2),
    marginTop: createSpacing(2),
  },
  hiddenFooterLeftContent: {},
  hiddenFooterRightContent: {
    marginLeft: 'auto',
  },

  badgeCheckedRoot: {
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: 'absolute',
    top: -8,
    right: -8,
  },

  badgeChecked: {
    backgroundColor: blue[500],
    borderRadius: 22,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
