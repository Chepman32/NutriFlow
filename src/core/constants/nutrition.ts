/**
 * Nutrition Constants for NutriFlow
 * Defines nutrition-related constants, calculations, and reference values
 */

export const MacroCaloriesPerGram = {
  carbs: 4,
  proteins: 4,
  fats: 9,
  alcohol: 7,
} as const;

export const ActivityLevels = {
  sedentary: {
    multiplier: 1.2,
    label: 'Sedentary',
    description: 'Little or no exercise',
  },
  light: {
    multiplier: 1.375,
    label: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
  },
  moderate: {
    multiplier: 1.55,
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
  },
  active: {
    multiplier: 1.725,
    label: 'Very Active',
    description: 'Hard exercise 6-7 days/week',
  },
  veryActive: {
    multiplier: 1.9,
    label: 'Extremely Active',
    description: 'Very hard exercise & physical job',
  },
} as const;

export const GoalTypes = {
  lose_weight: {
    label: 'Lose Weight',
    calorieAdjustment: -500, // 500 calorie deficit
    weeklyWeightChange: -0.5, // kg per week
  },
  maintain: {
    label: 'Maintain Weight',
    calorieAdjustment: 0,
    weeklyWeightChange: 0,
  },
  gain_muscle: {
    label: 'Gain Muscle',
    calorieAdjustment: 300, // 300 calorie surplus
    weeklyWeightChange: 0.25, // kg per week
  },
} as const;

export const MacroRatios = {
  balanced: {
    label: 'Balanced',
    carbs: 40,
    proteins: 30,
    fats: 30,
  },
  lowCarb: {
    label: 'Low Carb',
    carbs: 20,
    proteins: 40,
    fats: 40,
  },
  highProtein: {
    label: 'High Protein',
    carbs: 30,
    proteins: 40,
    fats: 30,
  },
  keto: {
    label: 'Ketogenic',
    carbs: 5,
    proteins: 25,
    fats: 70,
  },
} as const;

export const WaterIntakePerKg = {
  base: 30, // ml per kg of body weight
  active: 35, // ml per kg for active individuals
  veryActive: 40, // ml per kg for very active individuals
} as const;

export const MealTypes = {
  breakfast: { label: 'Breakfast', icon: 'sunny-outline', caloriePercent: 25 },
  lunch: { label: 'Lunch', icon: 'restaurant-outline', caloriePercent: 35 },
  dinner: { label: 'Dinner', icon: 'moon-outline', caloriePercent: 30 },
  snacks: { label: 'Snacks', icon: 'fast-food-outline', caloriePercent: 10 },
} as const;

export const FastingTypes = {
  '16_8': {
    label: '16:8',
    description: '16 hours fasting, 8 hours eating',
    fastingHours: 16,
    eatingHours: 8,
  },
  '18_6': {
    label: '18:6',
    description: '18 hours fasting, 6 hours eating',
    fastingHours: 18,
    eatingHours: 6,
  },
  '20_4': {
    label: '20:4',
    description: '20 hours fasting, 4 hours eating',
    fastingHours: 20,
    eatingHours: 4,
  },
  '5_2': {
    label: '5:2',
    description: '5 days normal, 2 days 500-600 calories',
    fastingHours: 0,
    eatingHours: 0,
  },
  omad: {
    label: 'OMAD',
    description: 'One Meal A Day',
    fastingHours: 23,
    eatingHours: 1,
  },
} as const;

export const FoodCategories = {
  vegetables: { label: 'Vegetables', icon: 'leaf', color: '#4CAF50' },
  fruits: { label: 'Fruits', icon: 'nutrition', color: '#FF9800' },
  grains: { label: 'Grains', icon: 'grain', color: '#FDD835' },
  proteins: { label: 'Proteins', icon: 'fish', color: '#F44336' },
  dairy: { label: 'Dairy', icon: 'water', color: '#64B5F6' },
  fats_oils: { label: 'Fats & Oils', icon: 'water-outline', color: '#FFB74D' },
  beverages: { label: 'Beverages', icon: 'cafe', color: '#8D6E63' },
  snacks: { label: 'Snacks', icon: 'fast-food', color: '#FF7043' },
  prepared_meals: { label: 'Prepared Meals', icon: 'restaurant', color: '#AB47BC' },
  condiments: { label: 'Condiments', icon: 'flask', color: '#78909C' },
  supplements: { label: 'Supplements', icon: 'fitness', color: '#26C6DA' },
} as const;

export const DailyRecommendations = {
  fiber: {
    male: 38, // grams
    female: 25, // grams
  },
  sodium: {
    max: 2300, // mg
    ideal: 1500, // mg
  },
  sugar: {
    male: 36, // grams
    female: 25, // grams
  },
  cholesterol: {
    max: 300, // mg
  },
} as const;

export const ServingUnits = [
  { value: 'g', label: 'Grams (g)' },
  { value: 'mg', label: 'Milligrams (mg)' },
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'l', label: 'Liters (l)' },
  { value: 'oz', label: 'Ounces (oz)' },
  { value: 'lb', label: 'Pounds (lb)' },
  { value: 'cup', label: 'Cup' },
  { value: 'tbsp', label: 'Tablespoon' },
  { value: 'tsp', label: 'Teaspoon' },
  { value: 'piece', label: 'Piece' },
  { value: 'slice', label: 'Slice' },
  { value: 'serving', label: 'Serving' },
] as const;
