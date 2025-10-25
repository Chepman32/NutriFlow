/**
 * Swipeable Card Component
 * Card with swipe-to-delete gesture
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Card } from '../common/Card';
import { hapticSwipe } from '@/core/utils/haptics';

interface SwipeableCardProps {
  children: React.ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onDelete,
  onEdit,
}) => {
  const translateX = useSharedValue(0);
  const DELETE_THRESHOLD = -100;
  const EDIT_THRESHOLD = 100;

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
    })
    .onEnd(e => {
      if (e.translationX < DELETE_THRESHOLD && onDelete) {
        runOnJS(hapticSwipe)();
        runOnJS(onDelete)();
      } else if (e.translationX > EDIT_THRESHOLD && onEdit) {
        runOnJS(hapticSwipe)();
        runOnJS(onEdit)();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <Card>{children}</Card>
      </Animated.View>
    </GestureDetector>
  );
};
