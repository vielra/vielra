import React, { FC } from 'react';
import { View } from 'react-native';

// Core components
import { Typography } from '@/components/core';

// Shared component
import { SafeAreaView } from '@/components/shared';

export const PhraseListScreen: FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Typography variant="h5">Phrase Category screen 👋 </Typography>
      </View>
    </SafeAreaView>
  );
};
