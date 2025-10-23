/**
 * Spacing Constants for NutriFlow
 * Defines spacing scale and component-specific spacing
 */

export const Spacing = {
  xs: 4,
  sm: 8,
  base: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,

  // Screen padding
  screenPadding: {
    horizontal: 16,
    vertical: 20,
  },

  // Component spacing
  component: {
    cardPadding: 16,
    buttonHeight: 48,
    inputHeight: 56,
    iconSize: {
      xs: 16,
      sm: 20,
      base: 24,
      lg: 32,
      xl: 40,
    },
  },
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,

  // Component-specific
  button: 12,
  card: 16,
  input: 12,
  modal: 20,
  bottomSheet: 24,
} as const;

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 12,
  },
} as const;
