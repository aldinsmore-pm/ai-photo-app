import React, { useRef, useState } from 'react';
import { PanResponder, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { forwardRef, useImperativeHandle } from 'react';

interface Props {
  strokeColor?: string;
  strokeWidth?: number;
}

export interface MaskOverlayHandle {
  capture: () => Promise<string>; // returns local uri
}

const MaskOverlay = forwardRef<MaskOverlayHandle, Props>(({ strokeColor = '#ffffff', strokeWidth = 40 }, ref) => {
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

  const viewShotRef = useRef<ViewShot>(null);

  useImperativeHandle(ref, () => ({
    capture: async () => {
      const uri = await viewShotRef.current?.capture?.({ format: 'png', result: 'tmpfile' });
      return uri || '';
    },
  }));

  return (
    <ViewShot ref={viewShotRef} style={StyleSheet.absoluteFill} collapsable={false}>
      <Svg
        pointerEvents="box-none"
        style={StyleSheet.absoluteFill}
        {...panResponder.panHandlers}
      >
        {paths.map((d, idx) => (
          <Path key={idx} d={d} stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>
        ))}
      </Svg>
    </ViewShot>
  );
});

export default MaskOverlay; 