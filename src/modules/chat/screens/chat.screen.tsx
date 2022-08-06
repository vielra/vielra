import React, { FC } from 'react';

import { ScrollView } from 'react-native';

// Core component
import { Button, Typography } from '@/components/core';

// Shared component
import { SafeAreaView } from '@/components/shared';

// Constants
import { RoutesConstant } from '@/constants';

export const ChatScreen: FC = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Chat</Typography>
        <Button
          onPress={() => props.navigation.navigate(RoutesConstant.BottomTab.HomeScreen)}
          variant="text"
          title="Go to home"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
