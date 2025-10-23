/**
 * Validation Utilities
 * Input validation functions for user data
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate weight (must be positive and within reasonable range)
 */
export const isValidWeight = (weight: number, unit: 'kg' | 'lbs' = 'kg'): boolean => {
  if (unit === 'kg') {
    return weight > 0 && weight <= 500; // max 500 kg
  }
  return weight > 0 && weight <= 1100; // max 1100 lbs
};

/**
 * Validate height (must be positive and within reasonable range)
 */
export const isValidHeight = (height: number, unit: 'cm' | 'inches' = 'cm'): boolean => {
  if (unit === 'cm') {
    return height >= 50 && height <= 300; // 50cm to 300cm
  }
  return height >= 20 && height <= 120; // 20 inches to 120 inches
};

/**
 * Validate age (must be between 13 and 120)
 */
export const isValidAge = (age: number): boolean => {
  return age >= 13 && age <= 120;
};

/**
 * Validate calorie amount
 */
export const isValidCalories = (calories: number): boolean => {
  return calories >= 0 && calories <= 10000; // reasonable upper limit
};

/**
 * Validate macro amount (carbs, proteins, fats)
 */
export const isValidMacroAmount = (amount: number): boolean => {
  return amount >= 0 && amount <= 1000; // reasonable upper limit in grams
};

/**
 * Validate serving size
 */
export const isValidServingSize = (servings: number): boolean => {
  return servings > 0 && servings <= 100;
};

/**
 * Validate water intake (in ml)
 */
export const isValidWaterIntake = (ml: number): boolean => {
  return ml >= 0 && ml <= 10000; // max 10 liters per entry
};

/**
 * Validate barcode format (EAN-13, UPC-A, etc.)
 */
export const isValidBarcode = (barcode: string): boolean => {
  // Allow 8, 12, 13, or 14 digit barcodes
  const barcodeRegex = /^(\d{8}|\d{12}|\d{13}|\d{14})$/;
  return barcodeRegex.test(barcode);
};

/**
 * Validate food name (must not be empty and reasonable length)
 */
export const isValidFoodName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 200;
};

/**
 * Validate body fat percentage
 */
export const isValidBodyFat = (percentage: number): boolean => {
  return percentage >= 3 && percentage <= 60; // reasonable range
};

/**
 * Validate password strength
 * Must be at least 8 characters with at least one uppercase, one lowercase, and one number
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Validate date is not in future
 */
export const isValidPastDate = (date: Date): boolean => {
  return date.getTime() <= new Date().getTime();
};

/**
 * Validate activity duration (in minutes)
 */
export const isValidActivityDuration = (minutes: number): boolean => {
  return minutes > 0 && minutes <= 1440; // max 24 hours
};

/**
 * Validate fasting duration (in hours)
 */
export const isValidFastingDuration = (hours: number): boolean => {
  return hours >= 1 && hours <= 168; // 1 hour to 7 days
};

/**
 * Get validation error message
 */
export const getValidationError = (field: string, value: any): string | null => {
  switch (field) {
    case 'email':
      return isValidEmail(value) ? null : 'Please enter a valid email address';
    case 'weight':
      return isValidWeight(value) ? null : 'Please enter a valid weight';
    case 'height':
      return isValidHeight(value) ? null : 'Please enter a valid height';
    case 'age':
      return isValidAge(value) ? null : 'Age must be between 13 and 120';
    case 'calories':
      return isValidCalories(value) ? null : 'Please enter a valid calorie amount';
    case 'password':
      return isValidPassword(value)
        ? null
        : 'Password must be at least 8 characters with uppercase, lowercase, and number';
    default:
      return null;
  }
};
