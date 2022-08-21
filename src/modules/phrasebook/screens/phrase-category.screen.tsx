import React, { FC, useCallback } from 'react';
import { ActivityIndicator, ListRenderItem, StyleSheet, View, FlatList } from 'react-native';

// Core components
import { IconButton } from '@/components/core';

// Component
import { SafeAreaView, ScreenTitle } from '@/components/shared';
import { PhraseCategoryItem } from '@/modules/phrasebook/components';

// Constants
import { RoutesConstant } from '@/constants';

// Hooks
import { useAuth } from '@/modules/auth';
import { useDispatch } from 'react-redux';
// import { useTheme } from '@/modules/theme/hooks';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Action creators
import { phrasebook_actionFetchPraseCategory } from '@/modules/phrasebook/redux';
import { common_actionSetBottomSheetAuthRequired } from '@/modules/common/redux';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { isSmallScreen } from '@/utils';

// Theme config
import * as themeConfig from '@/modules/theme/config';

// Interfaces
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IPhrasebookStackParamList } from '@/modules/phrasebook/navigators';

type AuthStackNavigationProp = NativeStackNavigationProp<
  IPhrasebookStackParamList,
  typeof RoutesConstant.PhrasebookStack.PhraseCategoryScreen
>;

export const PhraseCategoryScreen: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const { isLoggedIn } = useAuth();

  const dispatch = useDispatch();
  const { phraseCategory_data, phraseCategory_isLoading } = usePhrasebook();

  /**
   * Handle press icon button add new phrase
   */
  const handlePressAddPhrase = (): void => {
    if (isLoggedIn) {
      navigation.navigate(RoutesConstant.RootStack.AddPhraseScreen);
    } else {
      dispatch(common_actionSetBottomSheetAuthRequired(true));
    }
  };

  const fetchPhrasebookCategory = (): void => {
    dispatch(phrasebook_actionFetchPraseCategory());
  };

  useFocusEffect(
    useCallback(() => {
      if (!phraseCategory_data.length) {
        fetchPhrasebookCategory();
      }
    }, [phraseCategory_data]),
  );

  const renderItem: ListRenderItem<IPhraseCategory> = ({ item }) => <PhraseCategoryItem item={item} />;

  return (
    <SafeAreaView>
      <ScreenTitle
        title="Phrasebook"
        titleSize="medium"
        renderRightContent={<IconButton onPress={handlePressAddPhrase} iconType="ionicons" icon="add" />}
      />
      {phraseCategory_isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          {phraseCategory_data && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={phraseCategory_data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              style={styles.flatList}
              contentContainerStyle={{ paddingHorizontal: createSpacing(isSmallScreen ? 4 : 6) }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: createSpacing(4),
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
});
