import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';

// Assets
import { LogoPrimaryVerticalLookup } from '@/assets';

// Constants
import { RoutesConstant } from '@/constants';

// Shared component
import { SafeAreaView } from '@/components/shared';

// Utils
import { createSpacing } from '@/modules/theme/utils';

import { Button, Typography } from '@/components/core';

// Hooks
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Action creators
import { theme_actionToggleMode } from '@/modules/theme/redux';

// Interfaces
import { IRootStackParamList } from '@/navigators';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<IRootStackParamList, typeof RoutesConstant.BottomTab.HomeScreen>;
type AuthStackNavigationProp = NativeStackNavigationProp<
  IRootStackParamList,
  typeof RoutesConstant.AuthStack.LoginScreen
>;

export const HomeScreen: FC<Props> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            borderWidth: 1,
            padding: createSpacing(4),
            marginVertical: createSpacing(8),
            marginHorizontal: createSpacing(8),
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: theme.shape.borderRadius * 2,
          }}>
          <Image
            style={{ height: 28, width: 'auto', resizeMode: 'contain', marginBottom: createSpacing(1) }}
            source={LogoPrimaryVerticalLookup}
          />
          <Typography variant="h4" style={{ textAlign: 'center', color: theme.palette.secondary.contrastText }}>
            Test! This is a new update feature!
          </Typography>
        </View>

        <View style={{ marginHorizontal: createSpacing(6) }}>
          <Button
            onPress={() => navigation.navigate(RoutesConstant.RootStack.AuthStack)}
            title="Navigate to AuthStack"
            startIcon="log-in"
            iconType="ionicons"
            color="secondary"
            variant="outlined"
            style={{ marginBottom: createSpacing(2), borderRadius: 40 }}
          />

          <Button
            onPress={() => navigation.navigate(RoutesConstant.RootStack.SettingsScreen)}
            title="Go to settings"
            startIcon="settings"
            iconType="ionicons"
            color="secondary"
            variant="text"
            style={{ marginBottom: createSpacing(2), borderRadius: 40 }}
          />

          <Button
            color="secondary"
            onPress={() => dispatch(theme_actionToggleMode())}
            title="Toggle Theme"
            size="small"
            startIcon="moon"
            iconType="ionicons"
            style={{ marginBottom: createSpacing(2) }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});
