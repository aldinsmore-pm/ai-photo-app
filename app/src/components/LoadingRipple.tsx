import React from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Circle, useValue, Easing, runTiming } from '@shopify/react-native-skia';

const SIZE = 150;

const LoadingRipple: React.FC = () => {
  const radius = useValue(0);
  const opacity = useValue(1);

  React.useEffect(() => {
    const loop = () => {
      radius.current = 0;
      opacity.current = 1;
      runTiming(radius, SIZE, { duration: 1500, easing: Easing.linear }, () => loop());
      runTiming(opacity, 0, { duration: 1500, easing: Easing.linear });
    };
    loop();
  }, []);

  return (
    <Canvas style={styles.canvas}>
      <Circle cx={SIZE / 2} cy={SIZE / 2} r={radius} color="white" opacity={opacity} />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: SIZE,
    height: SIZE,
  },
});

export default LoadingRipple; 