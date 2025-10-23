/**
 * Dark Theme Configuration
 */

import { DarkTheme as DarkColors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { Theme } from './types';

export const darkTheme: Theme = {
  colors: DarkColors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  isDark: true,
};
