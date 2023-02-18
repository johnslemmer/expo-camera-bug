import { Camera } from 'expo-camera';
import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import Constants from 'expo-constants';

export default function index() {
  const [permissions, requestPermissions] = Camera.useCameraPermissions();

  if (!permissions) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissions.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text>We need your permission to use the camera</Text>
        {permissions.canAskAgain ? (
          <Button
            onPress={requestPermissions}
            title="grant camera permissions"
          />
        ) : (
          <Text>
            You must go to your device's settings app and manually allow camera
            permissions.
          </Text>
        )}
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },
});
