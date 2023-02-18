import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType, VideoCodec, VideoQuality } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';

export default function CameraTest() {
  const router = useRouter();
  const cameraRef = React.useRef();
  const [recording, setRecording] = React.useState(false);

  async function startRecording() {
    setRecording(true);
    const file = await cameraRef.current?.recordAsync({
      codec: VideoCodec.HEVC,
      quality: VideoQuality['1080p'],
      maxDuration: 10 * 60, // 10 minutes
    });

    // NOTE this sometimes won't get reach when this screen
    // is getting unmounted
    console.log(`Recorded video at ${file.uri}`);
    setRecording(false);

    if (file === undefined) return;

    // keeps videos from clogging storage
    await FileSystem.deleteAsync(file.uri);
    console.log('deleted');
  }

  function stopRecording() {
    cameraRef.current?.stopRecording();
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera type={CameraType.front} ref={cameraRef} style={{height: '100%'}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
        />
        <Button
          title="Back Home"
          onPress={() => {
            stopRecording();
            router.back();
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
