/**
 * Recipe-related Type Definitions
 */

import { NutritionInfo } from './food.types';

export type RecipeCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snacks'
  | 'desserts'
  | 'smoothies'
  | 'salads'
  | 'soups';

export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number; // minutes
  cookTime: number;
  servings: number;
  difficulty: RecipeDifficulty;
  category: RecipeCategory;
  tags: string[];
  ingredients: RecipeIngredient[];
  instructions: RecipeStep[];
  nutrition: NutritionInfo;
  isPremium: boolean;
  rating?: number;
  ratingCount?: number;
}

export interface RecipeIngredient {
  foodId: string;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  duration?: number; // minutes
  imageUrl?: string;
}

export interface RecipeFilter {
  category?: RecipeCategory;
  difficulty?: RecipeDifficulty;
  maxPrepTime?: number;
  maxCalories?: number;
  tags?: string[];
  searchQuery?: string;
}
