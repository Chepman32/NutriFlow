/**
 * Search Stack Navigator
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchStackParamList } from '@/types/navigation.types';
import { SearchScreen } from '../screens/search/SearchScreen';
import { useTheme } from '@/core/theme';

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStackNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchHome" component={SearchScreen} />
    </Stack.Navigator>
  );
};
