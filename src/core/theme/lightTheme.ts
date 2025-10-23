/**
 * Light Theme Configuration
 */

import { LightTheme as LightColors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Theme } from './types';

export const lightTheme: Theme = {
  colors: LightColors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  isDark: false,
};
