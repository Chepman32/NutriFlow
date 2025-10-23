/**
 * Color Constants for NutriFlow
 * Defines color palettes for light and dark themes
 */

export const LightTheme = {
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  primaryLight: '#81C784',

  secondary: '#2196F3',
  secondaryDark: '#1976D2',
  secondaryLight: '#64B5F6',

  accent: '#FF9800',
  accentDark: '#F57C00',
  accentLight: '#FFB74D',

  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceVariant: '#E0E0E0',

  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',

  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
    inverse: '#FFFFFF',
  },

  nutrition: {
    calories: '#FF6B6B',
    carbs: '#FFD93D',
    proteins: '#6BCF7F',
    fats: '#4D96FF',
    water: '#64B5F6',
    fiber: '#A78BFA',
  },

  charts: {
    positive: '#4CAF50',
    negative: '#F44336',
    neutral: '#9E9E9E',
    gradient1: '#4CAF50',
    gradient2: '#81C784',
  },

  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    heavy: 'rgba(0, 0, 0, 0.3)',
  },
};

export const DarkTheme = {
  primary: '#66BB6A',
  primaryDark: '#4CAF50',
  primaryLight: '#81C784',

  secondary: '#42A5F5',
  secondaryDark: '#2196F3',
  secondaryLight: '#64B5F6',

  accent: '#FFA726',
  accentDark: '#FF9800',
  accentLight: '#FFB74D',

  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2C2C2C',

  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  info: '#42A5F5',

  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    disabled: '#6E6E6E',
    hint: '#8E8E8E',
    inverse: '#212121',
  },

  nutrition: {
    calories: '#FF8A80',
    carbs: '#FFE57F',
    proteins: '#81C784',
    fats: '#64B5F6',
    water: '#81D4FA',
    fiber: '#B39DDB',
  },

  charts: {
    positive: '#66BB6A',
    negative: '#EF5350',
    neutral: '#9E9E9E',
    gradient1: '#66BB6A',
    gradient2: '#81C784',
  },

  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },
};

export type ThemeColors = typeof LightTheme;
