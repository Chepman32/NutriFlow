/**
 * User-related Type Definitions
 */

export type Units = 'metric' | 'imperial';
export type ThemeMode = 'light' | 'dark' | 'auto';
export type StartOfWeek = 'monday' | 'sunday';
export type WaterUnit = 'ml' | 'oz' | 'cups';
export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type GoalType = 'lose_weight' | 'maintain' | 'gain_muscle';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  settings: UserSettings;
  goals: NutritionGoals;
  measurements: UserMeasurements;
  isPremium: boolean;
  premiumExpiresAt: Date | null;
}

export interface UserSettings {
  units: Units;
  theme: ThemeMode;
  startOfWeek: StartOfWeek;
  waterUnit: WaterUnit;
  notificationsEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  biometricAuthEnabled: boolean;
}

export interface NutritionGoals {
  dailyCalories: number;
  carbs: number; // grams
  proteins: number; // grams
  fats: number; // grams
  water: number; // ml or oz
  goalType: GoalType;
  activityLevel: ActivityLevel;
  weeklyWeightChange: number; // kg or lbs per week
}

export interface UserMeasurements {
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: Gender;
  bodyFat?: number; // percentage
  muscleMass?: number; // kg or lbs
  waist?: number; // cm or inches
  hips?: number;
  chest?: number;
  bmi?: number;
}

export interface MeasurementHistory {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  waist?: number;
  hips?: number;
  chest?: number;
  bmi?: number;
  notes?: string;
}
