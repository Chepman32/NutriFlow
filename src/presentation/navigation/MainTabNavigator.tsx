/**
 * Main Tab Navigator
 * Bottom tab navigation for main app sections
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/types/navigation.types';
import { useTheme } from '@/core/theme';
import { DiaryStackNavigator } from './DiaryStackNavigator';
import { SearchStackNavigator } from './SearchStackNavigator';
import { AnalyticsStackNavigator } from './AnalyticsStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Simple icon placeholder
const Icon: React.FC<{ name: string; focused: boolean; color: string }> = ({ name, focused, color }) => {
  const emoji = {
    Diary: '📝',
    Search: '🔍',
    Analytics: '📊',
    Profile: '👤',
  }[name] || '•';

  return <Text style={{ fontSize: 24 }}>{emoji}</Text>;
};

export const MainTabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.surfaceVariant,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.xs,
          fontFamily: theme.typography.fontFamily.medium,
        },
      }}
    >
      <Tab.Screen
        name="Diary"
        component={DiaryStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Diary" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Search" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Analytics" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Profile" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
