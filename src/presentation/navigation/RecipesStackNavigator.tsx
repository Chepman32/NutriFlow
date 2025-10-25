/**
 * Recipes Stack Navigator
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RecipesStackParamList } from '@/types/navigation.types';
import { RecipesScreen } from '../screens/recipes/RecipesScreen';

const Stack = createStackNavigator<RecipesStackParamList>();

export const RecipesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipesHome" component={RecipesScreen} />
    </Stack.Navigator>
  );
};
