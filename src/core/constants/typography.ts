/**
 * Typography Constants for NutriFlow
 * Defines font families, sizes, line heights, and text styles
 */

export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    light: 'Inter-Light',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 40,
    '4xl': 44,
    '5xl': 56,
  },

  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
  },

  // Predefined text styles
  styles: {
    h1: {
      fontSize: 36,
      lineHeight: 44,
      fontFamily: 'Inter-Bold',
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 30,
      lineHeight: 40,
      fontFamily: 'Inter-Bold',
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 24,
      lineHeight: 36,
      fontFamily: 'Inter-SemiBold',
      letterSpacing: 0,
    },
    h4: {
      fontSize: 20,
      lineHeight: 32,
      fontFamily: 'Inter-SemiBold',
      letterSpacing: 0,
    },
    h5: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: 'Inter-Medium',
      letterSpacing: 0,
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Inter-Regular',
      letterSpacing: 0,
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Inter-Regular',
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Inter-Regular',
      letterSpacing: 0.25,
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Inter-SemiBold',
      letterSpacing: 0.5,
    },
    overline: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Inter-Medium',
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
    },
  },
} as const;

export type TypographyStyles = keyof typeof Typography.styles;
