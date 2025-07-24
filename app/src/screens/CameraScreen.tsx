import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CameraView from '../components/CameraView';
import StyleBar from '../components/StyleBar';
import ShutterButton from '../components/ShutterButton';
import { Camera } from 'react-native-vision-camera';
import { useJobStore } from '../store/useJobStore';
import OpenAIService from '../services/OpenAIService';

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
      addJob({ id: jobId, presetId: currentStyleId, status: 'generating' });

      (navigation as any).navigate('Loading', { jobId });

      const result = await OpenAIService.generateImage(currentStyleId);
      const imageUrl = result.data[0].url;
      updateJob(jobId, { status: 'completed', resultUri: imageUrl });
      // Result navigation handled by LoadingScreen once job completes
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsCapturing(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* We forward ref to CameraView in later refactor; for now overlay shutter */}
      <CameraView ref={cameraRef as any} />

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