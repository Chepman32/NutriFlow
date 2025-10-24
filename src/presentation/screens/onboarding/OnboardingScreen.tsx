/**
 * Onboarding Screen
 * Multi-step onboarding flow
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/core/theme';
import { Button } from '@/presentation/components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const OnboardingScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to NutriFlow',
      description: 'Track your nutrition journey with ease',
      emoji: '👋',
    },
    {
      title: 'Set Your Goals',
      description: 'Define your health and fitness objectives',
      emoji: '🎯',
    },
    {
      title: 'Track Everything',
      description: 'Log meals, water, weight, and activities',
      emoji: '📊',
    },
  ];

  const handleComplete = async () => {
    await AsyncStorage.setItem('@onboarding_complete', 'true');
    navigation.navigate('Main' as never);
  };

  const currentStep = steps[step];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{currentStep.emoji}</Text>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          {currentStep.title}
        </Text>
        <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
          {currentStep.description}
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title={step === steps.length - 1 ? 'Get Started' : 'Next'}
          onPress={() => {
            if (step === steps.length - 1) {
              handleComplete();
            } else {
              setStep(step + 1);
            }
          }}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emoji: { fontSize: 100, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  description: { fontSize: 18, textAlign: 'center', marginBottom: 32 },
  footer: { padding: 24 },
});
