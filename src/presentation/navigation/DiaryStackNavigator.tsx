/**
 * Diary Stack Navigator
 * Navigation for diary-related screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DiaryStackParamList } from '@/types/navigation.types';
import { DiaryScreen } from '../screens/diary/DiaryScreen';
import { AddFoodScreen } from '../screens/diary/AddFoodScreen';
import { useTheme } from '@/core/theme';

const Stack = createStackNavigator<DiaryStackParamList>();

export const DiaryStackNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.semibold,
          fontSize: theme.typography.fontSize.lg,
        },
      }}
    >
      <Stack.Screen
        name="DiaryHome"
        component={DiaryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={{ title: 'Add Food' }}
      />
    </Stack.Navigator>
  );
};
