import React, { FC, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, ListRenderItem, Pressable, FlatList, StyleSheet, View } from 'react-native';

// Core components
import { IconButton, Typography } from '@/components/core';

// Shared component
import { EmptyState, StatusBar } from '@/components/shared';
import { IPhrasebookStackParamList } from '../navigators';

// Action creators
import { phrasebook_actionFetchPhraseList } from '@/modules/phrasebook/redux';

// Components
import { Ionicons } from '@/components/icons';
import { BottomSheetOptionsMenuPhraseList, PhraseCardItem } from '@/modules/phrasebook/components';

// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { usePhrasebook } from '../hooks';
import { useTheme } from '@/modules/theme/hooks';

// Utils
import { isIOS, isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Theme config
import * as themeConfig from '@/modules/theme/config';

// Interfaces
import { IPhrase } from '@/modules/phrasebook/interfaces';
import { UUID } from '@/modules/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const HEADER_HEIGHT = isIOS ? 100 : 90;

type Props = NativeStackScreenProps<IPhrasebookStackParamList, 'PhraseListScreen'>;

export const PhraseListScreen: FC<Props> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { route } = props;
  const { top: safeAreaInsetsTop } = useSafeAreaInsets();

  const paramsCategory = route.params.category;

  const { phraseList_data, phraseList_isLoading } = usePhrasebook();

  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  /**
   * Get phrase by category
   * @param {string} category
   * @return {void}
   */
  const fetchPhraseList = (category: string): void => {
    dispatch(phrasebook_actionFetchPhraseList(category));
  };

  useFocusEffect(
    useCallback(() => {
      if (paramsCategory) {
        fetchPhraseList(paramsCategory.slug);
      }
    }, []),
  );

  const phraseIsEmpty = useMemo(() => {
    return paramsCategory.phrases_count === 0;
  }, [paramsCategory.phrases_count]);

  /**
   *  Phrase list by category
   */
  const phraseList = useMemo<IPhrase[]>(() => {
    if (phraseList_data?.[paramsCategory.slug]) {
      return phraseList_data[paramsCategory.slug];
    }
    return [];
  }, [phraseList_data]);

  const handleSelect = useCallback(
    (selectedPhraseId: UUID) => {
      setSelectedItems([...selectedItems, selectedPhraseId]);
    },
    [selectedItems],
  );

  const isSelectionMode = useMemo<boolean>(() => {
    return selectedItems.length > 0;
  }, [selectedItems.length]);

  const renderItem: ListRenderItem<IPhrase> = ({ item }) => (
    <PhraseCardItem
      item={item}
      isSelected={Boolean(selectedItems.find((x) => x === item.id))}
      onSelect={handleSelect}
      isSelectionMode={isSelectionMode}
    />
  );

  const getHeaderBackgroundColor = useMemo(() => {
    if (isSelectionMode) {
      return theme.palette.secondary.main;
    } else {
      return paramsCategory.color || theme.palette.primary.main;
    }
  }, [isSelectionMode, paramsCategory]);

  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <View style={{ backgroundColor: phraseList_isLoading ? 'transparent' : theme.palette.background.default }}>
        <View
          style={StyleSheet.flatten([styles.absoluteBackgroundHeader, { backgroundColor: getHeaderBackgroundColor }])}
        />

        {isSelectionMode ? (
          <View style={styles.selectedModeHeaderRoot}>
            <View
              style={StyleSheet.flatten([
                styles.headerContainer,
                {
                  marginTop: safeAreaInsetsTop + createSpacing(2),
                },
              ])}>
              <IconButton
                icon="close"
                iconType="ionicons"
                onPress={() => setSelectedItems([])}
                iconStyle={{ color: theme.palette.common.white }}
              />
              <Typography variant="h5" style={styles.textSelectionMode}>
                {selectedItems.length} Selected
              </Typography>

              <View style={styles.selectionRightContent}>
                <IconButton
                  icon="trash-outline"
                  iconType="ionicons"
                  onPress={() => setSelectedItems([])}
                  iconStyle={{ color: theme.palette.common.white }}
                />
                <IconButton
                  icon="heart-outline"
                  iconType="ionicons"
                  onPress={() => setSelectedItems([])}
                  iconStyle={{ color: theme.palette.common.white }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={StyleSheet.flatten([styles.headerRoot])}>
            <View
              style={StyleSheet.flatten([
                styles.headerContainer,
                {
                  marginTop: safeAreaInsetsTop + createSpacing(2),
                },
              ])}>
              <View style={styles.headerLeftContent}>
                <Pressable onPress={() => setShowOptionsMenu(true)} style={styles.headerLeftContentPressable}>
                  {({ pressed }) => (
                    <View
                      style={StyleSheet.flatten([
                        styles.headerLeftContentInner,
                        {
                          ...(pressed && {
                            backgroundColor: 'rgba(0,0,0,0.1)',
                          }),
                        },
                      ])}>
                      <Ionicons name="ios-bookmarks-outline" size={28} style={StyleSheet.flatten([styles.iconStyle])} />
                      <View style={styles.headerTextContainer}>
                        <Typography variant="h5" style={styles.headerText} numberOfLines={1}>
                          {paramsCategory.name.en}
                        </Typography>
                        <Typography variant="subtitle2" style={StyleSheet.flatten([styles.textCount])}>
                          {paramsCategory.phrases_count + ' phrases'}
                        </Typography>
                      </View>
                    </View>
                  )}
                </Pressable>
              </View>
              <View style={styles.headerRightContent}>
                <View style={styles.headerRightContentContainer}>
                  <IconButton
                    icon="heart"
                    iconType="ionicons"
                    iconStyle={{ color: theme.palette.primary.contrastText }}
                    onPress={() => navigation.goBack()}
                  />
                  <IconButton
                    icon="more-vert"
                    iconType="material-icons"
                    iconStyle={{ color: theme.palette.primary.contrastText }}
                    onPress={() => setShowOptionsMenu(true)}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {phraseIsEmpty && (
          <View style={StyleSheet.flatten([styles.boxEmptyState])}>
            <EmptyState style={{ backgroundColor: theme.palette.background.paper }} height={200} />
          </View>
        )}

        {phraseList_isLoading ? (
          <View
            style={StyleSheet.flatten([
              styles.loadingBox,
              {
                backgroundColor: theme.palette.background.paper,
              },
            ])}>
            <ActivityIndicator size="large" color={theme.palette.secondary.main} />
          </View>
        ) : (
          <>
            {phraseList.length > 0 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={phraseList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.flatListStyle}
                contentContainerStyle={{
                  paddingHorizontal: createSpacing(4),
                  paddingTop: createSpacing(2),
                }}
              />
            )}
          </>
        )}
      </View>
      <BottomSheetOptionsMenuPhraseList show={showOptionsMenu} onClose={() => setShowOptionsMenu(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  absoluteBackgroundHeader: {
    position: 'absolute',
    zIndex: 1,
    height: 160,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
  },
  headerRoot: {
    zIndex: 2,
    height: HEADER_HEIGHT,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingLeft: createSpacing(3),
    paddingRight: createSpacing(5),
    alignItems: 'center',
    paddingBottom: createSpacing(isIOS ? 4 : 1),
  },
  headerLeftContent: {
    flex: 1,
    marginRight: 'auto',
  },
  headerLeftContentPressable: {},
  headerLeftContentInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
    alignSelf: 'flex-start',
    paddingHorizontal: createSpacing(3),
    paddingVertical: createSpacing(1.5),
    borderRadius: themeConfig.shape.borderRadius,
  },
  headerTextContainer: {
    marginLeft: createSpacing(4),
  },
  headerText: {
    color: themeConfig.paletteBase.common.white,
    lineHeight: 22,
  },
  iconStyle: {
    color: themeConfig.paletteBase.common.white,
  },
  textCount: {
    color: themeConfig.paletteBase.common.white,
  },
  headerRightContent: {
    alignItems: 'flex-end',
  },
  headerRightContentContainer: {
    flexDirection: 'row',
    marginRight: -4,
  },

  selectedModeHeaderRoot: {
    height: HEADER_HEIGHT,
    zIndex: 2,
  },
  textSelectionMode: {
    color: themeConfig.paletteBase.common.white,
    lineHeight: 20,
    marginLeft: createSpacing(3),
  },
  selectionRightContent: {
    alignItems: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
  },

  flatListStyle: {
    zIndex: 3,
    marginBottom: 80,
  },

  loadingBox: {
    borderRadius: themeConfig.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: createSpacing(3),
    height: 180,
    zIndex: 3,
  },
  boxEmptyState: {
    height: 200,
    paddingHorizontal: createSpacing(isSmallScreen ? 4 : 6),
    zIndex: 3,
    borderRadius: themeConfig.shape.borderRadius,
    marginTop: createSpacing(3),
  },
});
