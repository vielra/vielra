import React, { FC, memo, useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

// Core components.
import { IconButton, Typography } from '@/components/core';

// Constants
// import { AppLanguage } from '@/modules/localization';

// Utils
import { createSpacing } from '@/modules/theme/utilities';

// Components
// import DropShadow from 'react-native-drop-shadow';
import { Ionicons } from '@/components/icons';

// Assets components
import { Assets } from '@/assets';

// Action creators
// import { phrasebook_actionDeletePhrase } from '@/modules/phrasebook/redux';

// Theme lib
import { paletteLibs } from '@/modules/theme/libs';

// Theme config.
import { themeConfig } from '@/modules/theme/configs';

// Hooks.
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';

// Interface
import { IPhrase } from '@/modules/phrasebook/interfaces';
import { AppLanguageCode } from '@/modules/app/interfaces';

const SelectionBadge = () => {
  const theme = useTheme();
  return (
    <View style={styles.badgeCheckedRoot}>
      <View style={styles.badgeChecked}>
        <Ionicons name='checkmark' color={theme.palette.common.white} size={15} />
      </View>
    </View>
  );
};

interface Props {
  item: IPhrase;
  isSelected: boolean;
  onSelect: (id: string) => void;
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
    // dispatch(phrasebook_actionDeletePhrase([item.id]));
  };

  const renderIconFlag = (lang: AppLanguageCode) => {
    let flag;
    switch (lang) {
      case 'vi':
        flag = Assets.flagVN_xs;
        break;
      case 'en':
        flag = Assets.flagUS_xs;
        break;
      case 'id':
        flag = Assets.flagID_xs;
        break;
      default:
        flag = undefined;
        break;
    }

    return <Image source={flag} style={styles.phrase_iconFlag} />;
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        {
          backgroundColor: theme.palette.background.paper,
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
      {isSelected && <SelectionBadge />}
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={({ pressed }) =>
          StyleSheet.flatten([
            styles.pressable,
            {
              backgroundColor: theme.palette.background.paper,
              borderColor: isSelected ? paletteLibs.green[500] : 'transparent',
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
                        icon='trash'
                        iconType='ionicons'
                        iconStyle={{ color: theme.palette.text.disabled }}
                      />
                    </View>
                    <View style={styles.hiddenFooterRightContent}>
                      <IconButton icon='heart' iconType='ionicons' iconStyle={{ color: theme.palette.text.disabled }} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    borderRadius: themeConfig.shape.borderRadius,
    marginBottom: createSpacing(3),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  pressable: {
    borderRadius: themeConfig.shape.borderRadius,
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: -8,
    right: -8,
  },
  badgeChecked: {
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: paletteLibs.green[600],
  },
});
