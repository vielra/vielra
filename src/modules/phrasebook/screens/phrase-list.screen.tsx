import React, { FC, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, ListRenderItem, Pressable, FlatList, StyleSheet, View } from 'react-native';

// Core components
import { IconButton, Screen, Typography } from '@/components/core';

// Shared component
import { EmptyState } from '@/components/shared';

// Components
import { Ionicons } from '@/components/core';
import {
  BottomSheetOptionsMenuPhraseList,
  BottomSheetPhraseDetail,
  BottomSheetPhrasebookCategoryList,
  PhraseCardItem,
} from '@/modules/phrasebook/components';

// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { useTheme } from '@/modules/theme/hooks';

// Utils
// import { isIOS, isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utilities';

// Theme config
import { themeConfig } from '@/modules/theme/configs';

// Interfaces
import { IPhrase, IPhraseCategory } from '@/modules/phrasebook/interfaces';
import { UUID } from '@/modules/common/interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { platformUtils, screenUtils } from '@/modules/app/utilities';
import { NavigationProps, NavigatorParamList } from '@/navigators';
import { useAppDispatch } from '@/plugins/redux';
import { useToast } from '@/modules/app/hooks';
import { paletteLibs } from '@/modules/theme/libs';
import FloatingButtonAddPhrase from '../components/floating-button-add-phrase';

type Props = NativeStackScreenProps<NavigatorParamList, 'phrase_list_screen'>;

const HEADER_HEIGHT = 60;

const PhraseListScreen = ({ route }: Props) => {
  const theme = useTheme();
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const insets = useSafeAreaInsets();

  const paramsCategory = route.params.category;

  const {
    listPhrasebook,
    phrasebook_getListPhrase,
    phrasebook_getListPhraseIsLoading,
    phrasebook_setListPhrasebook,
    snapIndexBottomSheetCategoryList,
    phrasebook_setSnapIndexBottomSheetCategoryList,
  } = usePhrasebook();

  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Array<UUID>>([]);

  const listPhases = useMemo(() => {
    return listPhrasebook?.[paramsCategory.id]?.phrases ?? [];
  }, [paramsCategory, listPhrasebook]);

  /**
   * Get phrase by category
   * @param {string} category
   * @return {void}
   */
  const getPhraseListByCategory = async (category: IPhraseCategory): Promise<void> => {
    try {
      console.log('CALL ME ->');
      const result = await phrasebook_getListPhrase({ category: category.slug, limit: null });
      if (result.isSuccess) {
        dispatch(phrasebook_setListPhrasebook(result.data));
      }
    } catch (e) {
      showToast({
        position: 'top',
        variant: 'filled',
        text1: 'Failed to get phrases',
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (paramsCategory) {
        getPhraseListByCategory(paramsCategory);

        // for close bottom sheet category
        dispatch(phrasebook_setSnapIndexBottomSheetCategoryList(-1));
      }
    }, []),
  );

  const isEmpty = useMemo(() => {
    return paramsCategory.phrases_count === 0;
  }, [paramsCategory.phrases_count]);

  /**
   *  Phrase list by category
   */
  // const phraseList = useMemo<IPhrase[]>(() => {
  //   if (phraseList_data?.[paramsCategory.slug]) {
  //     return phraseList_data[paramsCategory.slug];
  //   }
  //   return [];
  // }, [phraseList_data]);

  const onSelectItem = useCallback(
    (id: UUID) => {
      setSelectedItems([...selectedItems, id]);
    },
    [selectedItems.length],
  );

  const isSelectionMode = useMemo<boolean>(() => {
    return selectedItems.length > 0;
  }, [selectedItems.length]);

  const renderItem: ListRenderItem<IPhrase> = ({ item }) => (
    <PhraseCardItem
      item={item}
      isSelected={Boolean(selectedItems.find((x) => x === item.id))}
      onSelect={onSelectItem}
      isSelectionMode={isSelectionMode}
    />
  );

  const onPressHeaderTitle = useCallback(() => {
    dispatch(phrasebook_setSnapIndexBottomSheetCategoryList(0));
  }, [snapIndexBottomSheetCategoryList]);

  // console.log('snapIndexBottomSheetCategoryList', snapIndexBottomSheetCategoryList);

  const headerBackground = useMemo(() => {
    if (isSelectionMode) {
      return paletteLibs.green[600];
    } else {
      return paramsCategory.color || theme.palette.primary.main;
    }
  }, [isSelectionMode, paramsCategory]);

  return (
    <>
      <Screen
        preset='fixed'
        statusBarStyle='light-content'
        backgroundColor={theme.palette.background.paper}
        headerBackgroundColor={headerBackground}>
        <View
          style={{
            backgroundColor: phrasebook_getListPhraseIsLoading ? 'transparent' : theme.palette.background.default,
          }}>
          <View style={StyleSheet.flatten([styles.absoluteBackgroundHeader, { backgroundColor: headerBackground }])} />
          {isSelectionMode ? (
            <View style={styles.selectedModeHeaderRoot}>
              <View style={StyleSheet.flatten([styles.headerContainer])}>
                <IconButton
                  icon='close'
                  iconType='ionicons'
                  onPress={() => setSelectedItems([])}
                  iconStyle={{ color: theme.palette.common.white }}
                />
                <Typography variant='h5' style={styles.textSelectionMode}>
                  {selectedItems.length} Selected
                </Typography>

                <View style={styles.selectionRightContent}>
                  <IconButton
                    icon='trash-outline'
                    iconType='ionicons'
                    onPress={() => setSelectedItems([])}
                    iconStyle={{ color: theme.palette.common.white }}
                  />
                  <IconButton
                    icon='heart-outline'
                    iconType='ionicons'
                    onPress={() => setSelectedItems([])}
                    iconStyle={{ color: theme.palette.common.white }}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={StyleSheet.flatten([styles.headerRoot])}>
              <View style={StyleSheet.flatten([styles.headerContainer])}>
                <View style={styles.headerLeftContent}>
                  <Pressable onPress={onPressHeaderTitle} style={styles.headerLeftContentPressable}>
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
                        <Ionicons name='bookmarks-outline' size={28} style={StyleSheet.flatten([styles.iconStyle])} />
                        <View style={styles.headerTextContainer}>
                          <Typography variant='h5' fontWeight='bold' style={styles.headerText} numberOfLines={1}>
                            {paramsCategory.name.en}
                          </Typography>
                          <Typography variant='subtitle2' style={StyleSheet.flatten([styles.textCount])}>
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
                      icon='close'
                      iconType='ionicons'
                      iconStyle={{ color: theme.palette.primary.contrastText }}
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          {isEmpty ? (
            <View style={StyleSheet.flatten([styles.boxEmptyState])}>
              <EmptyState
                style={{ backgroundColor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius }}
                height={200}
              />
            </View>
          ) : (
            <>
              {phrasebook_getListPhraseIsLoading && listPhases.length === 0 ? (
                <View
                  style={StyleSheet.flatten([
                    styles.loadingBox,
                    {
                      backgroundColor: theme.palette.background.paper,
                    },
                  ])}>
                  <ActivityIndicator size='large' color={theme.palette.secondary.main} />
                </View>
              ) : (
                <>
                  {listPhases.length > 0 && (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={listPhases}
                      keyExtractor={(item) => String(item.id)}
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
            </>
          )}
        </View>
      </Screen>
      {/* <BottomSheetOptionsMenuPhraseList show={showOptionsMenu} onClose={() => setShowOptionsMenu(false)} /> */}
      <FloatingButtonAddPhrase />
      <BottomSheetPhraseDetail />
      <BottomSheetPhrasebookCategoryList />
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
    width: screenUtils.width,
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
    // paddingBottom: createSpacing(platformUtils.isIOS ? 4 : 1),
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
    paddingHorizontal: themeConfig.horizontalSpacing,
    zIndex: 3,
    borderRadius: 10,
    marginTop: createSpacing(3),
  },
});

export default PhraseListScreen;
