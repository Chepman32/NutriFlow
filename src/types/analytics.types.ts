/**
 * Analytics-related Type Definitions
 */

export type TimeRange = 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface NutritionTrend {
  date: Date;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  water: number;
}

export interface WeightTrend {
  date: Date;
  weight: number;
  bmi?: number;
}

export interface MacroDistribution {
  carbs: number;
  proteins: number;
  fats: number;
}

export interface CalorieStatistics {
  average: number;
  min: number;
  max: number;
  total: number;
  daysTracked: number;
  goalDaysAchieved: number;
  goalAchievementRate: number; // percentage
}

export interface WeightProgress {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  weightLost: number;
  weightRemaining: number;
  progressPercentage: number;
  averageWeeklyChange: number;
  estimatedWeeksToGoal: number;
}

export interface NutritionReport {
  timeRange: TimeRange;
  startDate: Date;
  endDate: Date;
  calorieStats: CalorieStatistics;
  macroAverage: MacroDistribution;
  nutritionTrends: NutritionTrend[];
  weightProgress?: WeightProgress;
  topFoods: TopFoodItem[];
  mealDistribution: MealDistribution;
}

export interface TopFoodItem {
  foodId: string;
  foodName: string;
  timesEaten: number;
  totalCalories: number;
}

export interface MealDistribution {
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
}

export interface DailyStreak {
  currentStreak: number;
  longestStreak: number;
  lastTrackedDate: Date;
}

export interface GoalAchievement {
  date: Date;
  goalType: 'calories' | 'protein' | 'water' | 'steps' | 'weight';
  achieved: boolean;
  target: number;
  actual: number;
}

export interface ChartDataPoint {
  x: Date | string | number;
  y: number;
  label?: string;
}

export interface ComparisonData {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  improved: boolean;
}
