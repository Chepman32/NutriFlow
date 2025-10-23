/**
 * Animation Constants for NutriFlow
 * Defines animation durations, easing curves, and spring configurations
 */

import { Easing } from 'react-native-reanimated';

export const AnimationDurations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

export const AnimationEasing = {
  linear: Easing.linear,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  bounce: Easing.bounce,
  elastic: Easing.elastic(1.5),
  bezier: Easing.bezier(0.25, 0.1, 0.25, 1),
} as const;

export const SpringConfigs = {
  gentle: {
    damping: 20,
    mass: 1,
    stiffness: 100,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
  bouncy: {
    damping: 10,
    mass: 1,
    stiffness: 200,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
  snappy: {
    damping: 15,
    mass: 0.5,
    stiffness: 300,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
  smooth: {
    damping: 25,
    mass: 1,
    stiffness: 120,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
} as const;

export const GestureThresholds = {
  swipeVelocity: 500,
  swipeDistance: 50,
  longPressDelay: 500,
  tapMaxDuration: 150,
  doubleTapDelay: 300,
} as const;

export const TransitionPresets = {
  fadeIn: {
    duration: AnimationDurations.normal,
    easing: AnimationEasing.easeOut,
  },
  slideIn: {
    duration: AnimationDurations.normal,
    easing: AnimationEasing.easeOut,
  },
  scaleIn: {
    duration: AnimationDurations.fast,
    easing: AnimationEasing.elastic,
  },
  modalPresentation: {
    duration: AnimationDurations.normal,
    easing: AnimationEasing.bezier,
  },
} as const;

export const HapticPatterns = {
  light: 'impactLight',
  medium: 'impactMedium',
  heavy: 'impactHeavy',
  selection: 'selection',
  success: 'notificationSuccess',
  warning: 'notificationWarning',
  error: 'notificationError',
} as const;
