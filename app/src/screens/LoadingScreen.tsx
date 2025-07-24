import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useJobStore } from '../store/useJobStore';

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Loading'>>();
  const { jobId } = route.params;

  const job = useJobStore((s) => s.jobs.find((j) => j.id === jobId));

  useEffect(() => {
    if (!job) return;
    if (job.status === 'completed') {
      navigation.reset({ index: 0, routes: [{ name: 'Result', params: { jobId } }] } as any);
    }
    if (job.status === 'error') {
      navigation.goBack();
    }
  }, [job]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.label}>Generating…</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 16,
    color: '#fff',
    fontSize: 16,
  },
});

export default LoadingScreen; 