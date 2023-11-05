import React, { FC, useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

// core components
import { IconButton, Screen } from '@/components/core';

// shared component
import { PhraseForm } from '@/modules/phrasebook/components';

// utils
import { createSpacing } from '@/modules/theme/utilities';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// import { phrasebook_actionFetchPraseCategory } from '../redux';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { useTheme } from '@/modules/theme/hooks';

import { themeConfig } from '@/modules/theme/configs';
import { paletteLibs } from '@/modules/theme/libs';
import { NavigationProps } from '@/navigators';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const AddPhraseScreen: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { listCategories, phrasebook_getListCategory, phrasebook_setListCategories } = usePhrasebook();
  const navigation = useNavigation<NavigationProps>();
  const fetchPhrasebookCategory = async (): Promise<void> => {
    try {
      const response = await phrasebook_getListCategory(undefined);
      if (response.isSuccess) {
        dispatch(phrasebook_setListCategories(response.data));
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (listCategories.length === 0) {
        fetchPhrasebookCategory();
      }
    }, []),
  );

  return (
    <Screen
      preset='fixed'
      titleColor='#ffffff'
      title='Add New Phrase'
      statusBarStyle='light-content'
      backgroundColor={theme.palette.background.paper}
      headerBackgroundColor={paletteLibs.blue[500]}
      headerRightContent={
        <IconButton
          onPress={() => navigation.navigate('phrase_category_screen')}
          icon='close'
          iconType='ionicons'
          size='large'
          iconStyle={styles.headerTitleText}
        />
      }>
      <View style={{ backgroundColor: theme.palette.background.paper, flex: 1 }}>
        <View
          style={StyleSheet.flatten([styles.absoluteBackgroundHeader, { backgroundColor: paletteLibs.blue[500] }])}
        />
        <ScrollView
          bounces={false}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.scrollView_contentContainer}>
          <PhraseForm />
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    zIndex: 3,
  },
  scrollView_contentContainer: {
    flex: 1,
  },
  absoluteBackgroundHeader: {
    position: 'absolute',
    zIndex: 1,
    height: 90,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
  },
  headerRoot: {
    zIndex: 2,
    paddingBottom: createSpacing(2),
    flex: 0,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    backgroundColor: 'transparent',
  },
  headerTitleText: {
    color: themeConfig.paletteBase.common.white,
  },
});

export default AddPhraseScreen;
