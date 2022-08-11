import React, { FC, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Core components
import { Typography } from '@/components/core';

// Shared component
import { SafeAreaView } from '@/components/shared';
import { PhraseForm } from '@/modules/phrasebook/components';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { phrasebook_actionFetchPraseCategory } from '../redux';
import { usePhrasebook } from '@/modules/phrasebook/hooks';

export const AddPhraseScreen: FC = () => {
  const dispatch = useDispatch();

  const state = usePhrasebook();

  useFocusEffect(
    useCallback(() => {
      console.log('call me');
      const fetchPhrasebookCategory = (): void => {
        dispatch(phrasebook_actionFetchPraseCategory());
      };
      fetchPhrasebookCategory();
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView_contentContainer}>
        <PhraseForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollView_contentContainer: {
    paddingHorizontal: createSpacing(6),
  },
});
