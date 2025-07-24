import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import MaskOverlay, { MaskOverlayHandle } from '../components/MaskOverlay';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import ShutterButton from '../components/ShutterButton';
import { useJobStore } from '../store/useJobStore';
import OpenAIService from '../services/OpenAIService';
import { ensureUnder4MB } from '../utils/imageUtils';

interface Params {
  photoUri: string;
  presetId: string;
}

// Extend navigator types manually

type EditorRoute = RouteProp<Record<'Editor', Params>, 'Editor'>;

const EditorScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute() as EditorRoute;
  const { photoUri, presetId } = route.params;
  const [highFidelity, setHighFidelity] = useState(false);
  const maskRef = React.useRef<MaskOverlayHandle>(null);
  const addJob = useJobStore((s) => s.addJob);
  const updateJob = useJobStore((s) => s.updateJob);

  const handleGenerate = async () => {
    const jobId = Date.now().toString();
    addJob({ id: jobId, presetId, status: 'generating' });
    (navigation as any).navigate('Loading', { jobId });

    let maskUri: string | undefined;
    if (maskRef.current) {
      maskUri = await maskRef.current.capture();
    }

    const compressedPhoto = await ensureUnder4MB(photoUri);

    const result = await OpenAIService.editImage(presetId, compressedPhoto, maskUri, {
      inputFidelity: highFidelity ? 'high' : 'default',
    });
    const url = result.data[0].url;
    updateJob(jobId, { status: 'completed', resultUri: url });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="contain" />
      <MaskOverlay ref={maskRef} />

      <View style={styles.controls}>
        <View style={styles.row}>
          <Text style={styles.label}>High Fidelity</Text>
          <Switch value={highFidelity} onValueChange={setHighFidelity} />
        </View>
        <ShutterButton onPress={handleGenerate} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  preview: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: { color: '#fff', marginRight: 8 },
});

export default EditorScreen; 