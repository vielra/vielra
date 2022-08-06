import { Button, Typography } from '@/components/core';
import { RoutesConstant } from '@/constants';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SettingScreen: FC = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Settings</Typography>
        <Button
          onPress={() => props.navigation.navigate(RoutesConstant.BottomTab.Phrasebook)}
          variant="text"
          title="Go to phaasebook screen"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
