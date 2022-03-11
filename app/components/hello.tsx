import React, { FC } from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from './icons';

const backgroundColor = '#ff4991';

const Hello: FC = () => (
  <SafeAreaView style={styles.root}>
    <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />

    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
      <Text style={styles.smallText}>Hello 👋,</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.bigText}>React Native</Text>
        <Ionicons name="heart" color="#fbfbfb" style={{ marginLeft: 12 }} size={26} />
      </View>
    </View>

    <View>
      <Text style={{ color: '#eee', marginBottom: 20 }}>By Riski</Text>
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
