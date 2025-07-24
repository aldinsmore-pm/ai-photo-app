import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useJobStore } from '../store/useJobStore';
import { SafeAreaView } from 'react-native-safe-area-context';

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
});

export default ResultScreen; 