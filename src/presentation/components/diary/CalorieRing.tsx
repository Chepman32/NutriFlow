/**
 * Calorie Ring Component
 * Circular progress indicator for calorie tracking using Skia
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Canvas, Path, Skia, Circle } from '@shopify/react-native-skia';
import { useSharedValue, withSpring, useDerivedValue } from 'react-native-reanimated';
import { useTheme } from '@/core/theme';

interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: number;
  strokeWidth?: number;
}

export const CalorieRing: React.FC<CalorieRingProps> = ({
  consumed,
  target,
  size = 200,
  strokeWidth = 20,
}) => {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    const targetProgress = Math.min(consumed / target, 1);
    progress.value = withSpring(targetProgress, {
      damping: 20,
      stiffness: 100,
    });
  }, [consumed, target]);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  const path = Skia.Path.Make();
  path.addCircle(center, center, radius);

  const remaining = Math.max(target - consumed, 0);
  const percentage = Math.round((consumed / target) * 100);

  const getRingColor = () => {
    if (consumed > target * 1.1) return theme.colors.error;
    if (consumed > target * 0.9) return theme.colors.warning;
    return theme.colors.primary;
  };

  return (
    <View style={styles.container}>
      <Canvas style={{ width: size, height: size }}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          style="stroke"
          strokeWidth={strokeWidth}
          color={theme.colors.surfaceVariant}
        />

        {/* Progress circle - This is a simplified version */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          style="stroke"
          strokeWidth={strokeWidth}
          color={getRingColor()}
          opacity={0.8}
        />
      </Canvas>

      <View style={styles.centerContent}>
        <Text
          style={[
            styles.consumedText,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize['3xl'],
              fontFamily: theme.typography.fontFamily.bold,
            },
          ]}
        >
          {consumed}
        </Text>
        <Text
          style={[
            styles.targetText,
            {
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.base,
              fontFamily: theme.typography.fontFamily.regular,
            },
          ]}
        >
          / {target} cal
        </Text>
        <Text
          style={[
            styles.remainingText,
            {
              color: theme.colors.text.hint,
              fontSize: theme.typography.fontSize.sm,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {remaining} remaining
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consumedText: {},
  targetText: {},
  remainingText: {},
});
