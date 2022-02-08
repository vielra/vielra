import React, { FC } from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';

const backgroundColor = '#ff4991';

const Hello: FC = () => (
  <SafeAreaView style={styles.root}>
    <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
    <View>
      <Text style={styles.smallText}>Hello 👋,</Text>
      <Text style={styles.bigText}>React Native</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor,
  },
  smallText: {
    fontSize: 16,
    color: '#fbfbfb',
  },
  bigText: {
    fontSize: 28,
    color: '#fbfbfb',
    fontWeight: '600',
  },
});

export default Hello;
