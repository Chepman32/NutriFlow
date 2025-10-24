/**
 * Calculate Nutrition Goals Use Case
 * Calculates personalized daily calorie and macro goals
 */

import { NutritionGoals, UserMeasurements, ActivityLevel, GoalType } from '@/types';
import {
  calculateBMR,
  calculateTDEE,
  calculateDailyCalorieGoal,
  calculateMacroGoals,
  calculateWaterIntake,
} from '@/core/utils/calculations';

export interface CalculateNutritionGoalsInput {
  measurements: UserMeasurements;
  activityLevel: ActivityLevel;
  goalType: GoalType;
  macroRatio?: {
    carbs: number;
    proteins: number;
    fats: number;
  };
}

export class CalculateNutritionGoalsUseCase {
  async execute(input: CalculateNutritionGoalsInput): Promise<NutritionGoals> {
    const { measurements, activityLevel, goalType } = input;

    // Calculate BMR
    const bmr = calculateBMR(
      measurements.currentWeight,
      measurements.height,
      measurements.age,
      measurements.gender,
    );

    // Calculate TDEE
    const tdee = calculateTDEE(bmr, activityLevel);

    // Calculate daily calorie goal based on goal type
    const dailyCalories = calculateDailyCalorieGoal(tdee, goalType);

    // Use default macro ratio if not provided
    const macroRatio = input.macroRatio || {
      carbs: 40,
      proteins: 30,
      fats: 30,
    };

    // Calculate macro goals
    const macros = calculateMacroGoals(
      dailyCalories,
      macroRatio.carbs,
      macroRatio.proteins,
      macroRatio.fats,
    );

    // Calculate water intake goal
    const water = calculateWaterIntake(measurements.currentWeight, activityLevel);

    // Determine weekly weight change based on goal type
    let weeklyWeightChange = 0;
    switch (goalType) {
      case 'lose_weight':
        weeklyWeightChange = -0.5; // kg per week
        break;
      case 'gain_muscle':
        weeklyWeightChange = 0.25; // kg per week
        break;
      case 'maintain':
        weeklyWeightChange = 0;
        break;
    }

    const goals: NutritionGoals = {
      dailyCalories,
      carbs: macros.carbs,
      proteins: macros.proteins,
      fats: macros.fats,
      water,
      goalType,
      activityLevel,
      weeklyWeightChange,
    };

    return goals;
  }
}
