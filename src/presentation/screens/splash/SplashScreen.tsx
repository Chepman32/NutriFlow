/**
 * Splash Screen
 * App launch screen with animated logo
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';

export const SplashScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);
  const rotateValue = useSharedValue(0);

  useEffect(() => {
    // Animate logo entrance
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });

    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    rotateValue.value = withSequence(
      withTiming(360, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: 0 })
    );

    // Navigate to next screen after animation
    const timer = setTimeout(() => {
      navigation.navigate('Main' as never);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotateValue.value}deg` }
    ],
    opacity: opacity.value,
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primary },
      ]}
    >
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Text style={styles.logo}>🥗</Text>
        <Text
          style={[
            styles.appName,
            {
              color: theme.colors.text.inverse,
              fontSize: theme.typography.fontSize['4xl'],
              fontFamily: theme.typography.fontFamily.bold,
            },
          ]}
        >
          NutriFlow
        </Text>
      </Animated.View>

      <Text
        style={[
          styles.tagline,
          {
            color: theme.colors.text.inverse,
            fontSize: theme.typography.fontSize.base,
            opacity: 0.8,
          },
        ]}
      >
        Track. Nourish. Thrive.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {},
  tagline: {
    position: 'absolute',
    bottom: 60,
  },
});
