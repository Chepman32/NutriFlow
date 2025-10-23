/**
 * Food-related Type Definitions
 */

export type FoodCategory =
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'proteins'
  | 'dairy'
  | 'fats_oils'
  | 'beverages'
  | 'snacks'
  | 'prepared_meals'
  | 'condiments'
  | 'supplements';

export type ServingUnit =
  | 'g'
  | 'mg'
  | 'kg'
  | 'ml'
  | 'l'
  | 'oz'
  | 'lb'
  | 'cup'
  | 'tbsp'
  | 'tsp'
  | 'piece'
  | 'slice'
  | 'serving';

export interface Food {
  id: string;
  barcode?: string;
  name: string;
  brand?: string;
  servingSize: number;
  servingUnit: ServingUnit;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  saturatedFats?: number;
  transFats?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  cholesterol?: number;
  vitamins?: Vitamins;
  minerals?: Minerals;
  category: FoodCategory;
  verified: boolean;
  userCreated: boolean;
  imageUrl?: string;
  popularity: number;
  lastUsed?: Date;
  useCount: number;
}

export interface Vitamins {
  vitaminA?: number; // mcg
  vitaminB6?: number; // mg
  vitaminB12?: number; // mcg
  vitaminC?: number; // mg
  vitaminD?: number; // mcg
  vitaminE?: number; // mg
  vitaminK?: number; // mcg
}

export interface Minerals {
  calcium?: number; // mg
  iron?: number; // mg
  magnesium?: number; // mg
  potassium?: number; // mg
  zinc?: number; // mg
}

export interface NutritionInfo {
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface FavoriteFood {
  id: string;
  userId: string;
  foodId: string;
  addedAt: Date;
}

export interface FoodSearchResult extends Food {
  relevanceScore: number;
}
