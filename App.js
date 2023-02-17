import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera, CameraType, VideoCodec, VideoQuality } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

export default function App() {
  const cameraRef = React.useRef();
  const [recording, setRecording] = React.useState(false);
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

  async function startRecording() {
    try {
      setRecording(true);

      const file = await cameraRef.current?.recordAsync({
        codec: VideoCodec.HEVC,
        quality: VideoQuality['1080p'],
        maxDuration: 10 * 60, // 10 minutes
      });
      setRecording(false);

      console.log(`Recorded video at ${file.uri}`);

      // keeps videos from clogging storage
      await FileSystem.deleteAsync(file.uri)
    } catch (e) {
      console.error(e);
    }
  }

  function stopRecording() {
    cameraRef.current?.stopRecording();
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} type={CameraType.front} style={styles.camera} />
      <View style={styles.buttonContainer}>
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
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
  camera: {
    height: '33%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
