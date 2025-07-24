import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  onPicked: (uri: string) => void;
}

const SampleImagePicker: React.FC<Props> = ({ onPicked }) => {
  const handlePick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
    if (!res.canceled && res.assets?.length) {
      onPicked(res.assets[0].uri);
    }
  };
  return (
    <Pressable style={styles.btn} onPress={handlePick}>
      <Text style={styles.txt}>Choose Photo</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  txt: { fontWeight: '600' },
});

export default SampleImagePicker; 