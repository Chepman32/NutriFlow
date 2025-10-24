/**
 * Analytics Stack Navigator
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnalyticsStackParamList } from '@/types/navigation.types';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';

const Stack = createStackNavigator<AnalyticsStackParamList>();

export const AnalyticsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AnalyticsHome" component={AnalyticsScreen} />
    </Stack.Navigator>
  );
};
