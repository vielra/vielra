import React, { FC, useCallback } from 'react';
import { ActivityIndicator, ListRenderItem, StyleSheet, View, FlatList } from 'react-native';

// cpre components
import { Screen } from '@/components/core';

// component
import { PhraseCategoryItem } from '@/modules/phrasebook/components';

// Hooks
import { useAuth } from '@/modules/auth/hooks';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// import { phrasebook_actionFetchPraseCategory } from '@/modules/phrasebook/redux';
// import { common_actionSetBottomSheetAuthRequired } from '@/modules/common/redux';

// Utils
import { createSpacing } from '@/modules/theme/utilities';

// Theme config
import { themeConfig } from '@/modules/theme/configs';

// Interfaces
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';
import { useTheme } from '@/modules/theme/hooks';
import { NavigationProps } from '@/navigators';
import { uiConfig } from '@/modules/app/configs/ui.config';
import { useAppDispatch } from '@/plugins/redux';
import { screenUtils } from '@/modules/app/utilities';

const PhraseCategoryScreen: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAuth();

  const {
    listCategories,
    phrasebook_setListCategories,
    phrasebook_getListCategory,
    phrasebook_getListCategoryIsLoading,
    phrasebook_getListCategoryData,
  } = usePhrasebook();

  /**
   * Handle press icon button add new phrase
   */
  const handlePressAddPhrase = (): void => {
    if (isAuthenticated) {
      // navigation.navigate(RoutesConstant.RootStack.AddPhraseScreen);
    } else {
      // dispatch(common_actionSetBottomSheetAuthRequired(true));
    }
  };

  const getPhraseCategories = async (): Promise<void> => {
    try {
      const response = await phrasebook_getListCategory(undefined);
      if (response.isSuccess) {
        dispatch(phrasebook_setListCategories(response.data));
      }
    } catch (e) {}
  };

  useFocusEffect(
    useCallback(() => {
      getPhraseCategories();
    }, []),
  );

  const renderItem: ListRenderItem<IPhraseCategory> = ({ item }) => <PhraseCategoryItem item={item} />;

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      title='Phrasebook'
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12 }}>
      {phrasebook_getListCategoryIsLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listCategories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          style={styles.flatList}
          contentContainerStyle={{
            // paddingHorizontal: theme.horizontalSpacing,
            paddingBottom: uiConfig.bottomTabHeight,
          }}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  loadingBox: {
    borderRadius: themeConfig.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: createSpacing(3),
    height: screenUtils.height - uiConfig.bottomTabHeight,
    zIndex: 3,
  },
});

export default PhraseCategoryScreen;
