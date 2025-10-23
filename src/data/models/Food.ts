/**
 * Food Data Model
 * Handles food item data persistence and retrieval
 */

import { Food, Vitamins, Minerals, FoodCategory, ServingUnit } from '@/types';

export class FoodModel {
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

  constructor(data: Food) {
    this.id = data.id;
    this.barcode = data.barcode;
    this.name = data.name;
    this.brand = data.brand;
    this.servingSize = data.servingSize;
    this.servingUnit = data.servingUnit;
    this.calories = data.calories;
    this.carbs = data.carbs;
    this.proteins = data.proteins;
    this.fats = data.fats;
    this.saturatedFats = data.saturatedFats;
    this.transFats = data.transFats;
    this.fiber = data.fiber;
    this.sugar = data.sugar;
    this.sodium = data.sodium;
    this.cholesterol = data.cholesterol;
    this.vitamins = data.vitamins;
    this.minerals = data.minerals;
    this.category = data.category;
    this.verified = data.verified;
    this.userCreated = data.userCreated;
    this.imageUrl = data.imageUrl;
    this.popularity = data.popularity;
    this.lastUsed = data.lastUsed;
    this.useCount = data.useCount;
  }

  /**
   * Convert model to database row format
   */
  toDbRow(): any {
    return {
      id: this.id,
      barcode: this.barcode || null,
      name: this.name,
      brand: this.brand || null,
      serving_size: this.servingSize,
      serving_unit: this.servingUnit,
      calories: this.calories,
      carbs: this.carbs,
      proteins: this.proteins,
      fats: this.fats,
      saturated_fats: this.saturatedFats || null,
      trans_fats: this.transFats || null,
      fiber: this.fiber || null,
      sugar: this.sugar || null,
      sodium: this.sodium || null,
      cholesterol: this.cholesterol || null,
      vitamins_json: this.vitamins ? JSON.stringify(this.vitamins) : null,
      minerals_json: this.minerals ? JSON.stringify(this.minerals) : null,
      category: this.category,
      verified: this.verified ? 1 : 0,
      user_created: this.userCreated ? 1 : 0,
      image_url: this.imageUrl || null,
      popularity: this.popularity,
      last_used: this.lastUsed?.toISOString() || null,
      use_count: this.useCount,
    };
  }

  /**
   * Create model from database row
   */
  static fromDbRow(row: any): FoodModel {
    return new FoodModel({
      id: row.id,
      barcode: row.barcode,
      name: row.name,
      brand: row.brand,
      servingSize: row.serving_size,
      servingUnit: row.serving_unit,
      calories: row.calories,
      carbs: row.carbs,
      proteins: row.proteins,
      fats: row.fats,
      saturatedFats: row.saturated_fats,
      transFats: row.trans_fats,
      fiber: row.fiber,
      sugar: row.sugar,
      sodium: row.sodium,
      cholesterol: row.cholesterol,
      vitamins: row.vitamins_json ? JSON.parse(row.vitamins_json) : undefined,
      minerals: row.minerals_json ? JSON.parse(row.minerals_json) : undefined,
      category: row.category,
      verified: row.verified === 1,
      userCreated: row.user_created === 1,
      imageUrl: row.image_url,
      popularity: row.popularity,
      lastUsed: row.last_used ? new Date(row.last_used) : undefined,
      useCount: row.use_count,
    });
  }

  /**
   * Calculate nutrition for given servings
   */
  calculateNutrition(servings: number): {
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
  } {
    return {
      calories: Math.round(this.calories * servings),
      carbs: parseFloat((this.carbs * servings).toFixed(1)),
      proteins: parseFloat((this.proteins * servings).toFixed(1)),
      fats: parseFloat((this.fats * servings).toFixed(1)),
    };
  }

  /**
   * Increment use count and update last used date
   */
  incrementUsage(): void {
    this.useCount += 1;
    this.lastUsed = new Date();
    this.popularity += 1;
  }

  /**
   * Get display name (with brand if available)
   */
  getDisplayName(): string {
    return this.brand ? `${this.brand} - ${this.name}` : this.name;
  }

  /**
   * Get serving description
   */
  getServingDescription(): string {
    return `${this.servingSize} ${this.servingUnit}`;
  }
}
