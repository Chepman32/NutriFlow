/**
 * Theme Type Definitions
 */

import { ThemeColors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';

export interface Theme {
  colors: ThemeColors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
  isDark: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'auto';
