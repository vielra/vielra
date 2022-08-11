import React, { FC } from 'react';
import { View } from 'react-native';

// Core components
import { Button, Typography } from '@/components/core';

// Shared component
import { SafeAreaView } from '@/components/shared';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IPhrasebookStackParamList } from '../navigators';
import { RoutesConstant } from '@/constants';
import { useNavigation } from '@react-navigation/native';

type AuthStackNavigationProp = NativeStackNavigationProp<
  IPhrasebookStackParamList,
  typeof RoutesConstant.PhrasebookStack.PhraseCategoryScreen
>;

export const PhraseCategoryScreen: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <SafeAreaView>
      <View>
        <Typography variant="h5">Phrase Category screen 👋 </Typography>
        <Button
          onPress={() => navigation.navigate(RoutesConstant.PhrasebookStack.AddPhraseScreen)}
          startIcon="add"
          iconType="ionicons"
          title="Add new phrase"
        />
      </View>
    </SafeAreaView>
  );
};
