import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CameraView from '../components/CameraView';
import SampleImagePicker from '../components/SampleImagePicker';
import StyleBar from '../components/StyleBar';
import ShutterButton from '../components/ShutterButton';
import { Camera } from 'react-native-vision-camera';
import { useJobStore } from '../store/useJobStore';
import OpenAIService from '../services/OpenAIService';
import { useCameraDevices } from 'react-native-vision-camera';

type Capture = Awaited<ReturnType<Camera['takePhoto']>>;

const CameraScreen: React.FC = () => {
  const navigation = useNavigation();
  const cameraRef = useRef<Camera | null>(null);
  const addJob = useJobStore((s) => s.addJob);
  const updateJob = useJobStore((s) => s.updateJob);
  const currentStyleId = useJobStore((s) => s.currentStyleId);

  const [isCapturing, setIsCapturing] = useState(false);

  const handleShutter = async () => {
    if (!cameraRef.current || isCapturing) return;
    if (!currentStyleId) {
      Alert.alert('Select a style first');
      return;
    }

    try {
      setIsCapturing(true);
      const photo: Capture = await cameraRef.current.takePhoto({});
      const jobId = Date.now().toString();
      // Navigate to Editor for optional mask & settings. Generation happens there.
      (navigation as any).navigate('Editor', {
        photoUri: (photo as any).path ?? (photo as any).uri ?? '',
        presetId: currentStyleId,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsCapturing(false);
    }
  };

  const devicesObj = useCameraDevices();
  const hasDevice = !!(devicesObj as any).back; // quick check

  return (
    <SafeAreaView style={styles.container}>
      {hasDevice ? (
        <CameraView ref={cameraRef as any} />
      ) : (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <SampleImagePicker onPicked={(uri) => {
            (navigation as any).navigate('Editor', { photoUri: uri, presetId: currentStyleId });
          }} />
        </View>
      )}

      <View style={styles.barWrapper}>
        <StyleBar />
        <View style={styles.shutterWrapper}>
          <ShutterButton onPress={handleShutter} disabled={isCapturing} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  barWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  shutterWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default CameraScreen; 