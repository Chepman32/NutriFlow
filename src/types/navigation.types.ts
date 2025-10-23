/**
 * Navigation Type Definitions
 * Type-safe navigation parameters for React Navigation
 */

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MealType, ActivityType, FastingType } from './diary.types';

// Root Stack Navigator
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Diary: undefined;
  Search: undefined;
  Analytics: undefined;
  Recipes: undefined;
  Profile: undefined;
};

// Diary Stack Navigator
export type DiaryStackParamList = {
  DiaryHome: { date?: string };
  AddFood: { mealType: MealType; date: string };
  FoodDetails: { foodId: string };
  EditEntry: { entryId: string };
  AddWater: { date: string };
  AddActivity: { date: string };
  ActivityDetails: { activityId: string };
  QuickAdd: { mealType: MealType };
  MealPlan: undefined;
};

// Search Stack Navigator
export type SearchStackParamList = {
  SearchHome: undefined;
  FoodDetails: { foodId: string };
  BarcodeScanner: { mealType?: MealType };
  CreateFood: undefined;
  FavoritesList: undefined;
  RecentFoods: undefined;
};

// Analytics Stack Navigator
export type AnalyticsStackParamList = {
  AnalyticsHome: undefined;
  DetailedReport: { type: 'calories' | 'macros' | 'weight' | 'water' };
  WeightHistory: undefined;
  ProgressChart: { metric: string };
  ExportData: undefined;
};

// Recipes Stack Navigator
export type RecipesStackParamList = {
  RecipesHome: undefined;
  RecipeDetails: { recipeId: string };
  RecipeCategory: { category: string };
  CreateRecipe: undefined;
  MyRecipes: undefined;
  SavedRecipes: undefined;
};

// Profile Stack Navigator
export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Goals: undefined;
  Settings: undefined;
  Measurements: undefined;
  FastingSettings: undefined;
  FastingTimer: { sessionId?: string };
  Subscription: undefined;
  Help: undefined;
  About: undefined;
  Privacy: undefined;
};

// Navigation Props
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type DiaryStackNavigationProp = StackNavigationProp<DiaryStackParamList>;
export type SearchStackNavigationProp = StackNavigationProp<SearchStackParamList>;
export type AnalyticsStackNavigationProp = StackNavigationProp<AnalyticsStackParamList>;
export type RecipesStackNavigationProp = StackNavigationProp<RecipesStackParamList>;
export type ProfileStackNavigationProp = StackNavigationProp<ProfileStackParamList>;

// Route Props
export type DiaryHomeRouteProp = RouteProp<DiaryStackParamList, 'DiaryHome'>;
export type AddFoodRouteProp = RouteProp<DiaryStackParamList, 'AddFood'>;
export type FoodDetailsRouteProp = RouteProp<SearchStackParamList, 'FoodDetails'>;
export type RecipeDetailsRouteProp = RouteProp<RecipesStackParamList, 'RecipeDetails'>;
export type DetailedReportRouteProp = RouteProp<AnalyticsStackParamList, 'DetailedReport'>;

// Screen Props (combining navigation and route)
export interface DiaryHomeScreenProps {
  navigation: DiaryStackNavigationProp;
  route: DiaryHomeRouteProp;
}

export interface AddFoodScreenProps {
  navigation: DiaryStackNavigationProp;
  route: AddFoodRouteProp;
}

export interface FoodDetailsScreenProps {
  navigation: SearchStackNavigationProp;
  route: FoodDetailsRouteProp;
}

export interface RecipeDetailsScreenProps {
  navigation: RecipesStackNavigationProp;
  route: RecipeDetailsRouteProp;
}
