/**
 * Formatting Utilities
 * Functions for formatting dates, numbers, and other display values
 */

import { format, formatDistance, formatRelative, isToday, isYesterday } from 'date-fns';

/**
 * Format date for display
 * @param date - Date object or ISO string
 * @param formatStr - date-fns format string (default: 'MMM dd, yyyy')
 */
export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Format date relative to now (e.g., "2 days ago")
 */
export const formatDateRelative = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isToday(dateObj)) {
    return 'Today';
  }

  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }

  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

/**
 * Format time (e.g., "2:30 PM")
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
};

/**
 * Format datetime (e.g., "Jan 15, 2024 at 2:30 PM")
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy \'at\' h:mm a');
};

/**
 * Format number with specified decimal places
 */
export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toFixed(decimals);
};

/**
 * Format number as percentage
 */
export const formatPercentage = (num: number, decimals: number = 0): string => {
  return `${num.toFixed(decimals)}%`;
};

/**
 * Format calories (e.g., "1,234 cal")
 */
export const formatCalories = (calories: number): string => {
  return `${Math.round(calories).toLocaleString()} cal`;
};

/**
 * Format weight with unit
 */
export const formatWeight = (weight: number, unit: 'kg' | 'lbs' = 'kg'): string => {
  return `${weight.toFixed(1)} ${unit}`;
};

/**
 * Format height with unit
 */
export const formatHeight = (height: number, unit: 'cm' | 'ft' = 'cm'): string => {
  if (unit === 'cm') {
    return `${Math.round(height)} cm`;
  }

  // Convert cm to feet and inches
  const totalInches = height / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};

/**
 * Format water intake
 */
export const formatWater = (ml: number, unit: 'ml' | 'oz' | 'cups' = 'ml'): string => {
  if (unit === 'ml') {
    return `${Math.round(ml)} ml`;
  }

  if (unit === 'oz') {
    const oz = ml / 29.5735;
    return `${oz.toFixed(1)} oz`;
  }

  // cups
  const cups = ml / 236.588;
  return `${cups.toFixed(1)} cups`;
};

/**
 * Format macro amount (e.g., "45g")
 */
export const formatMacro = (grams: number): string => {
  return `${Math.round(grams)}g`;
};

/**
 * Format duration in minutes to readable format
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }

  return `${hours} hr${hours > 1 ? 's' : ''} ${mins} min`;
};

/**
 * Format large numbers with K/M suffix
 */
export const formatCompactNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return `${(num / 1000000).toFixed(1)}M`;
};

/**
 * Format BMI with category
 */
export const formatBMI = (bmi: number): string => {
  let category = '';

  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  return `${bmi.toFixed(1)} (${category})`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength - 3)}...`;
};

/**
 * Format meal type for display
 */
export const formatMealType = (mealType: string): string => {
  return mealType.charAt(0).toUpperCase() + mealType.slice(1);
};

/**
 * Format serving size with unit
 */
export const formatServingSize = (size: number, unit: string): string => {
  return `${size} ${unit}${size > 1 && unit !== 'g' && unit !== 'ml' ? 's' : ''}`;
};

/**
 * Format nutrient with unit
 */
export const formatNutrient = (amount: number, nutrient: string): string => {
  const units: Record<string, string> = {
    calories: 'cal',
    carbs: 'g',
    proteins: 'g',
    fats: 'g',
    fiber: 'g',
    sugar: 'g',
    sodium: 'mg',
    cholesterol: 'mg',
    vitaminA: 'mcg',
    vitaminC: 'mg',
    vitaminD: 'mcg',
    calcium: 'mg',
    iron: 'mg',
  };

  const unit = units[nutrient] || '';
  return `${Math.round(amount)}${unit}`;
};

/**
 * Format fasting time remaining
 */
export const formatFastingTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return `${hours}h ${mins}m`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
