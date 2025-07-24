import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, Pressable, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useJobStore } from '../store/useJobStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import Share from 'react-native-share';
import { showError } from '../utils/errorToast';

const ResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const { jobId } = route.params;
  const job = useJobStore((s) => s.jobs.find((j) => j.id === jobId));

  if (!job || job.status !== 'completed') {
    // fallback - navigate back
    navigation.goBack();
    return null;
  }

  const images = [job.resultUri];

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        showError('Permission denied to save photo');
        return;
      }
      await MediaLibrary.saveToLibraryAsync(images[0]!);
    } catch (e:any) {
      showError('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.open({ url: images[0]! });
    } catch {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item!}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.actions}>
        <Pressable style={styles.btn} onPress={handleSave} disabled={saving}>
          <Text style={styles.btnTxt}>{saving ? 'Saving…' : 'Save'}</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleShare}>
          <Text style={styles.btnTxt}>Share</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  list: { padding: 8 },
  image: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 8,
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnTxt: { fontWeight: '600' },
});

export default ResultScreen; 