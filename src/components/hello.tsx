import React, { FC } from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, Button } from 'react-native';
import { Ionicons } from './icons';

const backgroundColor = '#ff4991';
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { theme_actionToggleMode, theme_rootSelector } from '@/modules/theme/redux';
import { useTheme } from '@/modules/theme/hooks';
import { red } from '@/modules/theme/libs';

const Hello: FC = () => {
  const state = useAppSelector((s) => theme_rootSelector(s));
  const dispatch = useDispatch();

  const theme = useTheme();

  const toggleThemeMode = () => {
    dispatch(theme_actionToggleMode());
  };

  return (
    <SafeAreaView
      style={StyleSheet.flatten([
        styles.root,
        {
          backgroundColor: theme.palette.background.paper,
        },
      ])}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />

      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
        <Text style={StyleSheet.flatten([styles.smallText, { color: theme.palette.text.secondary }])}>Hello 👋,</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={StyleSheet.flatten([styles.bigText, { color: theme.palette.text.primary }])}>React Native</Text>
          <Ionicons name="heart" color={red[500]} style={{ marginLeft: 12 }} size={26} />
        </View>

        <Button onPress={toggleThemeMode} title="Toggle" />
      </View>

      <View>
        <Text style={{ color: '#eee', marginBottom: 20 }}>By Riski</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  smallText: {
    fontSize: 16,
  },
  bigText: {
    fontSize: 28,
    fontWeight: '600',
  },
});

export default Hello;
