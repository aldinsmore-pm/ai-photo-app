import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useJobStore } from '../store/useJobStore';
import stylesData from '../presets/styles.json';

interface StylePreset {
  id: string;
  name: string;
  prompt: string;
  thumbnailLutUri: string;
}

const presets = stylesData as StylePreset[];

const StyleBar: React.FC = () => {
  const currentStyleId = useJobStore((s) => s.currentStyleId);
  const setCurrentStyle = useJobStore((s) => s.setCurrentStyle);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={presets}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const selected = currentStyleId === item.id;
          return (
            <Pressable
              style={[styles.item, selected && styles.itemSelected]}
              onPress={() => setCurrentStyle(item.id)}
            >
              {/* For now we just display name; replace with LUT thumbnail later */}
              <Image
                source={{ uri: `https://placehold.co/64x64?text=${encodeURIComponent(item.name)}` }}
                style={styles.thumbnail}
              />
              <Text style={styles.label}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  listContent: {
    paddingHorizontal: 12,
  },
  item: {
    marginRight: 12,
    alignItems: 'center',
  },
  itemSelected: {
    transform: [{ scale: 1.05 }],
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginBottom: 4,
  },
  label: {
    color: '#fff',
    fontSize: 12,
  },
});

export default StyleBar; 