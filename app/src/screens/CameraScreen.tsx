import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CameraView from '../components/CameraView';
import StyleBar from '../components/StyleBar';

const CameraScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CameraView />
      <View style={styles.barWrapper}>
        <StyleBar />
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
  },
});

export default CameraScreen; 