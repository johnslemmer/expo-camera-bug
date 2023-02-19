import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/camera-test">Go To Camera Test</Link>
      <Link href="/sleep-test">Go To Sleep Test</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },
});
