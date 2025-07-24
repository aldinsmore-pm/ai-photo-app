import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const ShutterButton: React.FC<Props> = ({ onPress, disabled }) => {
  return (
    <Pressable
      accessibilityLabel="Shutter"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.outer, pressed && { opacity: 0.6 }, disabled && { opacity: 0.4 }]}
    >
      <View style={styles.inner} />
    </Pressable>
  );
};

const SIZE = 70;
const INNER_SIZE = 58;

const styles = StyleSheet.create({
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    backgroundColor: '#fff',
  },
});

export default ShutterButton; 