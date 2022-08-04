import React, { FC } from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';

import { useDispatch } from 'react-redux';
import { theme_actionToggleMode } from '@/modules/theme/redux';
import { useTheme } from '@/modules/theme/hooks';
import { LogoPrimaryVerticalLookup } from '@/assets';
import { useNavigation } from '@react-navigation/native';
import { RoutesConstant } from '@/constants';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { IRootStackParamList } from '@/navigators';
import { createSpacing } from '@/modules/theme/utils';
import { StatusBar } from '@/components/shared';
import { Button, Typography } from '@/components/core';

type Props = NativeStackScreenProps<IRootStackParamList, typeof RoutesConstant.WelcomeScreen>;
type AuthStackNavigationProp = NativeStackNavigationProp<IRootStackParamList, typeof RoutesConstant.Auth.AuthStack>;

export const WelcomeScreen: FC<Props> = (props) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={StyleSheet.flatten([styles.root, { backgroundColor: palette.background.paper }])}>
        <View>
          <Typography variant="h2">Hello 👋 </Typography>

          <Image style={styles.image} source={LogoPrimaryVerticalLookup} />
        </View>

        <Button
          onPress={() => navigation.navigate(RoutesConstant.Auth.AuthStack)}
          title="Navigate to AuthStack"
          startIcon="log-in"
          iconType="ionicons"
          color="secondary"
          variant="outlined"
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textHello: {
    fontSize: 24,
  },
  image: {
    width: Dimensions.get('screen').width / 2,
    height: 100,
    resizeMode: 'contain',
  },
});
