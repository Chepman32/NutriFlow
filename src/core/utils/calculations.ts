/**
 * Nutrition Calculation Utilities
 * BMR, TDEE, macro calculations, and other nutrition-related computations
 */

import { MacroCaloriesPerGram, ActivityLevels, GoalTypes } from '../constants/nutrition';

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * @param weight - in kilograms
 * @param height - in centimeters
 * @param age - in years
 * @param gender - 'male' | 'female' | 'other'
 * @returns BMR in calories/day
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female' | 'other',
): number => {
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;

  if (gender === 'male') {
    return baseBMR + 5;
  } else if (gender === 'female') {
    return baseBMR - 161;
  } else {
    // For 'other', use average
    return baseBMR - 78;
  }
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * @param bmr - Basal Metabolic Rate
 * @param activityLevel - Activity level multiplier key
 * @returns TDEE in calories/day
 */
export const calculateTDEE = (
  bmr: number,
  activityLevel: keyof typeof ActivityLevels,
): number => {
  return Math.round(bmr * ActivityLevels[activityLevel].multiplier);
};

/**
 * Calculate daily calorie goal based on TDEE and goal type
 * @param tdee - Total Daily Energy Expenditure
 * @param goalType - Goal type key
 * @returns Daily calorie goal
 */
export const calculateDailyCalorieGoal = (
  tdee: number,
  goalType: keyof typeof GoalTypes,
): number => {
  return Math.round(tdee + GoalTypes[goalType].calorieAdjustment);
};

/**
 * Calculate macro goals in grams based on calorie goal and ratios
 * @param dailyCalories - Daily calorie goal
 * @param carbsPercent - Percentage of calories from carbs
 * @param proteinsPercent - Percentage of calories from proteins
 * @param fatsPercent - Percentage of calories from fats
 * @returns Object with macro goals in grams
 */
export const calculateMacroGoals = (
  dailyCalories: number,
  carbsPercent: number,
  proteinsPercent: number,
  fatsPercent: number,
): {
  carbs: number;
  proteins: number;
  fats: number;
} => {
  return {
    carbs: Math.round((dailyCalories * (carbsPercent / 100)) / MacroCaloriesPerGram.carbs),
    proteins: Math.round(
      (dailyCalories * (proteinsPercent / 100)) / MacroCaloriesPerGram.proteins,
    ),
    fats: Math.round((dailyCalories * (fatsPercent / 100)) / MacroCaloriesPerGram.fats),
  };
};

/**
 * Calculate total calories from macros
 * @param carbs - in grams
 * @param proteins - in grams
 * @param fats - in grams
 * @returns Total calories
 */
export const calculateCaloriesFromMacros = (
  carbs: number,
  proteins: number,
  fats: number,
): number => {
  return Math.round(
    carbs * MacroCaloriesPerGram.carbs +
      proteins * MacroCaloriesPerGram.proteins +
      fats * MacroCaloriesPerGram.fats,
  );
};

/**
 * Calculate BMI (Body Mass Index)
 * @param weight - in kilograms
 * @param height - in centimeters
 * @returns BMI value
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

/**
 * Get BMI category
 * @param bmi - BMI value
 * @returns BMI category string
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

/**
 * Calculate daily water intake goal
 * @param weight - in kilograms
 * @param activityLevel - Activity level key
 * @returns Water intake in ml
 */
export const calculateWaterIntake = (
  weight: number,
  activityLevel: keyof typeof ActivityLevels,
): number => {
  let multiplier = 30; // base

  if (activityLevel === 'active' || activityLevel === 'veryActive') {
    multiplier = 40;
  } else if (activityLevel === 'moderate') {
    multiplier = 35;
  }

  return Math.round(weight * multiplier);
};

/**
 * Calculate calories remaining for the day
 * @param dailyGoal - Daily calorie goal
 * @param consumed - Calories consumed
 * @param burned - Calories burned through activity
 * @returns Remaining calories
 */
export const calculateCaloriesRemaining = (
  dailyGoal: number,
  consumed: number,
  burned: number = 0,
): number => {
  return Math.round(dailyGoal - consumed + burned);
};

/**
 * Calculate percentage of macro consumed
 * @param consumed - Amount consumed
 * @param goal - Goal amount
 * @returns Percentage (0-100)
 */
export const calculateMacroPercentage = (consumed: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.min(Math.round((consumed / goal) * 100), 100);
};

/**
 * Calculate estimated time to goal weight
 * @param currentWeight - Current weight in kg
 * @param goalWeight - Goal weight in kg
 * @param weeklyWeightChange - Expected weekly weight change in kg
 * @returns Number of weeks
 */
export const calculateTimeToGoal = (
  currentWeight: number,
  goalWeight: number,
  weeklyWeightChange: number,
): number => {
  if (weeklyWeightChange === 0) return 0;
  const weightDifference = Math.abs(goalWeight - currentWeight);
  return Math.ceil(weightDifference / Math.abs(weeklyWeightChange));
};

/**
 * Convert pounds to kilograms
 */
export const lbsToKg = (lbs: number): number => {
  return parseFloat((lbs * 0.453592).toFixed(2));
};

/**
 * Convert kilograms to pounds
 */
export const kgToLbs = (kg: number): number => {
  return parseFloat((kg * 2.20462).toFixed(2));
};

/**
 * Convert inches to centimeters
 */
export const inchesToCm = (inches: number): number => {
  return parseFloat((inches * 2.54).toFixed(1));
};

/**
 * Convert centimeters to inches
 */
export const cmToInches = (cm: number): number => {
  return parseFloat((cm / 2.54).toFixed(1));
};

/**
 * Convert oz to ml
 */
export const ozToMl = (oz: number): number => {
  return Math.round(oz * 29.5735);
};

/**
 * Convert ml to oz
 */
export const mlToOz = (ml: number): number => {
  return parseFloat((ml / 29.5735).toFixed(1));
};
