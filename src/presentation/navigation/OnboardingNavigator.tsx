/**
 * Onboarding Navigator
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';

const Stack = createStackNavigator();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingFlow" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};
