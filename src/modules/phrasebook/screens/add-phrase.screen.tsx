import React, { FC, useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

// Core components
import { IconButton, Typography } from '@/components/core';

// Shared component
import { SafeAreaView, ScreenTitle, StatusBar } from '@/components/shared';
import { PhraseForm } from '@/modules/phrasebook/components';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { phrasebook_actionFetchPraseCategory } from '../redux';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { useTheme } from '@/modules/theme/hooks';

import * as themeConfig from '@/modules/theme/config';
import { RoutesConstant } from '@/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export const AddPhraseScreen: FC = () => {
  const dispatch = useDispatch();
  const { phraseCategory_data } = usePhrasebook();
  const navigation = useNavigation();

  const theme = useTheme();

  const state = usePhrasebook();

  useFocusEffect(
    useCallback(() => {
      const fetchPhrasebookCategory = (): void => {
        dispatch(phrasebook_actionFetchPraseCategory());
      };
      if (!phraseCategory_data.length) {
        fetchPhrasebookCategory();
      }
    }, []),
  );

  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <View style={{ backgroundColor: theme.palette.background.paper, flex: 1 }}>
        <View
          style={StyleSheet.flatten([styles.absoluteBackgroundHeader, { backgroundColor: theme.palette.primary.main }])}
        />

        {/* Header */}
        <SafeAreaView style={styles.headerRoot}>
          <View>
            <ScreenTitle
              titleSize="medium"
              title="Add New Phrase"
              style={styles.headerTitle}
              textStyle={styles.headerTitleText}
              backButtonIconStyle={styles.headerTitleText}
              renderRightContent={
                <IconButton
                  onPress={() => navigation.navigate(RoutesConstant.BottomTab.Phrasebook as never)}
                  icon="close"
                  iconType="ionicons"
                  size="medium"
                  iconStyle={styles.headerTitleText}
                />
              }
            />
          </View>
        </SafeAreaView>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollView_contentContainer}>
          <PhraseForm />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    zIndex: 3,
  },
  scrollView_contentContainer: {},
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
