import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import Sleepy from '../components/Sleepy';

export default function Test() {
  const router = useRouter();
  const sleepyRef = React.useRef()

  return (
    <View style={styles.container}>
      <Sleepy ref={sleepyRef} />
      <View style={styles.buttonContainer}>
        <Button
          title='do work'
          onPress={() => {sleepyRef.current?.work(5_000)}}
        />
        <Button
          title='do work, but go back home before it is done'
          onPress={() => {
            sleepyRef.current?.work(5_000)
            console.log("going back home");
            router.back()
          }}
        />
      </View>
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
  cameraContainer: {
    height: '33%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
