import React, { useRef, useState } from 'react';
import { PanResponder, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  strokeColor?: string;
  strokeWidth?: number;
}

const MaskOverlay: React.FC<Props> = ({ strokeColor = '#ffffff', strokeWidth = 40 }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef<string>('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        currentPath.current = `M${gestureState.x0},${gestureState.y0}`;
      },
      onPanResponderMove: (_, gestureState) => {
        currentPath.current += ` L${gestureState.moveX},${gestureState.moveY}`;
        setPaths((prev) => [...prev.slice(0, -1), currentPath.current]);
      },
      onPanResponderRelease: () => {
        setPaths((prev) => [...prev, currentPath.current]);
        currentPath.current = '';
      },
    })
  ).current;

  return (
    <Svg
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill}
      {...panResponder.panHandlers}
    >
      {paths.map((d, idx) => (
        <Path key={idx} d={d} stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>
      ))}
    </Svg>
  );
};

export default MaskOverlay; 