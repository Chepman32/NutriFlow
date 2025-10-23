/**
 * Diary Entry Data Model
 * Handles diary entry data persistence and retrieval
 */

import { DiaryEntry, MealType, Food } from '@/types';

export class DiaryEntryModel {
  id: string;
  userId: string;
  date: Date;
  mealType: MealType;
  foodId: string;
  food?: Food;
  servings: number;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  createdAt: Date;
  notes?: string;
  imageUrl?: string;

  constructor(data: DiaryEntry) {
    this.id = data.id;
    this.userId = data.userId;
    this.date = data.date;
    this.mealType = data.mealType;
    this.foodId = data.foodId;
    this.food = data.food;
    this.servings = data.servings;
    this.calories = data.calories;
    this.carbs = data.carbs;
    this.proteins = data.proteins;
    this.fats = data.fats;
    this.createdAt = data.createdAt;
    this.notes = data.notes;
    this.imageUrl = data.imageUrl;
  }

  /**
   * Convert model to database row format
   */
  toDbRow(): any {
    return {
      id: this.id,
      user_id: this.userId,
      date: this.formatDate(this.date),
      meal_type: this.mealType,
      food_id: this.foodId,
      servings: this.servings,
      calories: this.calories,
      carbs: this.carbs,
      proteins: this.proteins,
      fats: this.fats,
      created_at: this.createdAt.toISOString(),
      notes: this.notes || null,
      image_url: this.imageUrl || null,
    };
  }

  /**
   * Create model from database row
   */
  static fromDbRow(row: any): DiaryEntryModel {
    return new DiaryEntryModel({
      id: row.id,
      userId: row.user_id,
      date: new Date(row.date),
      mealType: row.meal_type,
      foodId: row.food_id,
      servings: row.servings,
      calories: row.calories,
      carbs: row.carbs,
      proteins: row.proteins,
      fats: row.fats,
      createdAt: new Date(row.created_at),
      notes: row.notes,
      imageUrl: row.image_url,
    });
  }

  /**
   * Create model from database row with joined food data
   */
  static fromDbRowWithFood(row: any): DiaryEntryModel {
    const entry = DiaryEntryModel.fromDbRow(row);

    if (row.food_name) {
      entry.food = {
        id: row.food_id,
        name: row.food_name,
        brand: row.food_brand,
        servingSize: row.serving_size,
        servingUnit: row.serving_unit,
        calories: row.food_calories,
        carbs: row.food_carbs,
        proteins: row.food_proteins,
        fats: row.food_fats,
        category: row.food_category,
        verified: row.verified === 1,
        userCreated: row.user_created === 1,
        popularity: row.popularity,
        useCount: row.use_count,
      } as Food;
    }

    return entry;
  }

  /**
   * Format date for database storage (YYYY-MM-DD)
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Check if entry is from today
   */
  isToday(): boolean {
    const today = new Date();
    return this.formatDate(this.date) === this.formatDate(today);
  }

  /**
   * Get meal type display name
   */
  getMealTypeDisplay(): string {
    const mealNames: Record<MealType, string> = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Snacks',
    };

    return mealNames[this.mealType];
  }

  /**
   * Get serving description
   */
  getServingDescription(): string {
    if (!this.food) {
      return `${this.servings} serving${this.servings !== 1 ? 's' : ''}`;
    }

    return `${this.servings} x ${this.food.servingSize} ${this.food.servingUnit}`;
  }

  /**
   * Update servings and recalculate nutrition
   */
  updateServings(newServings: number): void {
    const ratio = newServings / this.servings;

    this.servings = newServings;
    this.calories = Math.round(this.calories * ratio);
    this.carbs = parseFloat((this.carbs * ratio).toFixed(1));
    this.proteins = parseFloat((this.proteins * ratio).toFixed(1));
    this.fats = parseFloat((this.fats * ratio).toFixed(1));
  }
}
