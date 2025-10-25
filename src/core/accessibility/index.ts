/**
 * Accessibility Helpers
 * Functions and constants for accessibility support
 */

export const AccessibilityRoles = {
  BUTTON: 'button',
  LINK: 'link',
  HEADER: 'header',
  IMAGE: 'image',
  TEXT: 'text',
  ADJUSTABLE: 'adjustable',
} as const;

export const AccessibilityTraits = {
  DISABLED: 'disabled',
  SELECTED: 'selected',
  ADJUSTABLE: 'adjustable',
} as const;

export const createAccessibilityLabel = (
  label: string,
  value?: string | number,
  unit?: string,
): string => {
  if (!value) return label;
  const formattedValue = unit ? `${value} ${unit}` : value;
  return `${label}, ${formattedValue}`;
};

export const createAccessibilityHint = (action: string): string => {
  return `Double tap to ${action}`;
};

export const MINIMUM_TOUCH_TARGET = 44; // iOS minimum touch target size

export const ensureMinimumTouchTarget = (size: number): number => {
  return Math.max(size, MINIMUM_TOUCH_TARGET);
};
