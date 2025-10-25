/**
 * Fasting Stack Navigator
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from '@/types/navigation.types';
import { FastingScreen } from '../screens/fasting/FastingScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

export const FastingStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FastingTimer" component={FastingScreen} />
    </Stack.Navigator>
  );
};
