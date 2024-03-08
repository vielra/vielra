import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ListRenderItem, Pressable, FlatList, StyleSheet, View } from 'react-native';

// Core components
import { IconButton, Screen, Typography } from '@/components/core';

// Shared component
import { EmptyState } from '@/components/shared';

// Components
import { Ionicons } from '@/components/core';
import { BottomSheetPhrasebookCategoryList, PhraseCardItem } from '@/modules/phrasebook/components';

// Hooks
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { useTheme } from '@/modules/theme/hooks';

// Utils
// import { isIOS, isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utilities';

// Theme config
import { themeConfig } from '@/modules/theme/configs';

// Interfaces
import { IPhrase } from '@/modules/phrasebook/interfaces';
import { UUID } from '@/modules/common/interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screenUtils } from '@/modules/app/utilities';
import { NavigationProps, NavigatorParamList } from '@/navigators';
import { useAppDispatch } from '@/plugins/redux';
import { useToast } from '@/modules/app/hooks';
import { FloatingButtonAddPhrase, BottomSheetPhraseDetail } from '@/modules/phrasebook/components';
import BillEmptySvg from '@/assets/svg/bill-list-bold-duotone.svg';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<NavigatorParamList, 'phrase_list_screen'>;

const HEADER_HEIGHT = 60;

const PhraseFavoriteScreen = () => {
  const theme = useTheme();
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const { t } = useTranslation();

  const {
    listPhrasebook,
    phrasebook_getListPhrase,
    phrasebook_getListPhraseIsLoading,
    phrasebookPersisted_setListPhrasebook,
    snapIndexBottomSheetCategoryList,
    phrasebook_setSnapIndexBottomSheetCategoryList,
    phrasebook_getFavoritePhrases,
    phrasebookPersisted_setListFavoritePhrase,
    phrasebook_getFavoritePhrasesIsLoading,
    listFavoritePhrase,
  } = usePhrasebook();

  const [selectedItems, setSelectedItems] = useState<Array<UUID>>([]);

  /**
   * Get phrase by category
   * @param {string} category
   * @return {void}
   */
  const getPhraseListByCategory = async (): Promise<void> => {
    try {
      const result = await phrasebook_getFavoritePhrases({ limit: 100 });
      if (result.isSuccess) {
        dispatch(phrasebookPersisted_setListFavoritePhrase(result.data));
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
      getPhraseListByCategory();

      // for close bottom sheet category
      dispatch(phrasebook_setSnapIndexBottomSheetCategoryList(-1));
    }, []),
  );

  const isEmpty = useMemo(() => {
    return !phrasebook_getFavoritePhrasesIsLoading && listFavoritePhrase.length === 0;
  }, [phrasebook_getFavoritePhrasesIsLoading, listFavoritePhrase]);

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
    return theme.palette.primary.main;
  }, []);

  return (
    <>
      <Screen preset='fixed' statusBarStyle='light-content' headerBackgroundColor={headerBackground}>
        <View
          style={{
            backgroundColor: theme.palette.background.default,
            flex: 1,
          }}>
          <View
            style={StyleSheet.flatten([
              styles.absoluteBackgroundHeader,
              { backgroundColor: theme.palette.primary.main },
            ])}
          />

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
                  <IconButton
                    size='large'
                    onPress={() => navigation.goBack()}
                    icon='arrow-back'
                    iconType='ionicons'
                    iconSize={24}
                    style={{ marginRight: createSpacing(4) }}
                    iconColor={themeConfig.paletteBase.common.white}
                  />
                  <Typography style={styles.headerTitle}>Favorites</Typography>
                </View>
                <View style={styles.headerRightContent} />
              </View>
            </View>
          )}

          {isEmpty ? (
            <View style={StyleSheet.flatten([styles.boxEmptyState])}>
              <BillEmptySvg
                height={100}
                width={100}
                color={theme.palette.text.disabled}
                style={{ marginBottom: createSpacing(4) }}
              />
              <Typography variant='h5' fontWeight='bold' color='text.secondary' gutterBottom>
                {t('phrasebook.favorite_phrase_empty_title')}
              </Typography>
              <Typography color='text.secondary' variant='subtitle1'>
                {t('phrasebook.favorite_phrase_empty_desc')}
              </Typography>
            </View>
          ) : (
            <>
              {phrasebook_getListPhraseIsLoading && listFavoritePhrase.length === 0 ? (
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
                  {listFavoritePhrase.length > 0 && (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={listFavoritePhrase}
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
      <BottomSheetPhraseDetail />
      <BottomSheetPhrasebookCategoryList />
    </>
  );
};

const styles = StyleSheet.create({
  absoluteBackgroundHeader: {
    position: 'absolute',
    height: 82,
    zIndex: 1,
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeConfig.paletteBase.common.white,
  },
  headerLeftContent: {
    flex: 1,
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: themeConfig.horizontalSpacing,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flex: 1,
    marginTop: -100,
  },
});

export default PhraseFavoriteScreen;
