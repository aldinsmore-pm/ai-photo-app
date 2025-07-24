import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraView: React.FC = () => {
  const devices = useCameraDevices();
  // @ts-ignore VisionCamera typing mismatch in current version
  const device = (devices as any).back;

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
    })();
  }, []);

  if (device == null) {
    return (
      <View style={styles.placeholder}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return <Camera style={StyleSheet.absoluteFill} device={device} isActive />;
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraView; 