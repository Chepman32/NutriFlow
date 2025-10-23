/**
 * Diary-related Type Definitions
 */

import { Food } from './food.types';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface DiaryEntry {
  id: string;
  userId: string;
  date: Date;
  mealType: MealType;
  foodId: string;
  food?: Food; // Populated from join
  servings: number;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  createdAt: Date;
  notes?: string;
  imageUrl?: string;
}

export interface DailyDiary {
  date: Date;
  entries: DiaryEntry[];
  waterIntake: number; // ml or oz
  weight?: number;
  steps?: number;
  activities: ActivityEntry[];
  fastingSession?: FastingSession;
  totalCalories: number;
  totalCarbs: number;
  totalProteins: number;
  totalFats: number;
  caloriesRemaining: number;
  notes?: string;
}

export interface DailySummary {
  id: string;
  userId: string;
  date: Date;
  waterIntake: number;
  weight?: number;
  steps?: number;
  totalCalories: number;
  totalCarbs: number;
  totalProteins: number;
  totalFats: number;
  notes?: string;
}

export interface MealSummary {
  mealType: MealType;
  entries: DiaryEntry[];
  totalCalories: number;
  totalCarbs: number;
  totalProteins: number;
  totalFats: number;
  targetCalories: number;
}

export interface ActivityEntry {
  id: string;
  userId: string;
  date: Date;
  activityType: ActivityType;
  duration: number; // minutes
  caloriesBurned: number;
  intensity: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: Date;
}

export type ActivityType =
  | 'walking'
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'gym'
  | 'yoga'
  | 'sports'
  | 'hiking'
  | 'dancing'
  | 'custom';

export interface FastingSession {
  id: string;
  userId: string;
  type: FastingType;
  startTime: Date;
  endTime: Date;
  duration: number; // hours
  completed: boolean;
  notes?: string;
}

export type FastingType = '16_8' | '18_6' | '20_4' | '5_2' | 'omad' | 'custom';

export interface FastingPlan {
  type: FastingType;
  fastingHours: number;
  eatingHours: number;
  customSchedule?: {
    fastingDays: number[];
    eatingDays: number[];
  };
}
