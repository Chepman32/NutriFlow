/**
 * Food Repository
 * Handles all food-related database operations
 */

import { databaseService } from '../database/DatabaseService';
import { FoodModel } from '../models/Food';
import { Food, FoodCategory, FoodSearchResult } from '@/types';

export class FoodRepository {
  /**
   * Create a new food item
   */
  async create(food: Food): Promise<FoodModel> {
    const foodModel = new FoodModel(food);
    const row = foodModel.toDbRow();

    const fields = Object.keys(row);
    const placeholders = fields.map(() => '?').join(', ');
    const values = Object.values(row);

    await databaseService.executeSql(
      `INSERT INTO foods (${fields.join(', ')}) VALUES (${placeholders})`,
      values,
    );

    return foodModel;
  }

  /**
   * Get food by ID
   */
  async getById(foodId: string): Promise<FoodModel | null> {
    const [result] = await databaseService.executeSql(
      'SELECT * FROM foods WHERE id = ?',
      [foodId],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return FoodModel.fromDbRow(result.rows.item(0));
  }

  /**
   * Get food by barcode
   */
  async getByBarcode(barcode: string): Promise<FoodModel | null> {
    const [result] = await databaseService.executeSql(
      'SELECT * FROM foods WHERE barcode = ?',
      [barcode],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return FoodModel.fromDbRow(result.rows.item(0));
  }

  /**
   * Search foods by name
   */
  async search(
    query: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<FoodSearchResult[]> {
    const searchQuery = `%${query.toLowerCase()}%`;

    const [result] = await databaseService.executeSql(
      `SELECT *,
        CASE
          WHEN LOWER(name) = LOWER(?) THEN 100
          WHEN LOWER(name) LIKE ? THEN 90
          WHEN LOWER(brand) = LOWER(?) THEN 85
          WHEN LOWER(brand) LIKE ? THEN 80
          ELSE 50
        END + (popularity / 10) as relevance_score
      FROM foods
      WHERE LOWER(name) LIKE ? OR LOWER(brand) LIKE ?
      ORDER BY relevance_score DESC, popularity DESC, last_used DESC
      LIMIT ? OFFSET ?`,
      [query, `${query}%`, query, `${query}%`, searchQuery, searchQuery, limit, offset],
    );

    const foods: FoodSearchResult[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      const food = FoodModel.fromDbRow(row);
      foods.push({
        ...food,
        relevanceScore: row.relevance_score,
      });
    }

    return foods;
  }

  /**
   * Get foods by category
   */
  async getByCategory(
    category: FoodCategory,
    limit: number = 50,
  ): Promise<FoodModel[]> {
    const [result] = await databaseService.executeSql(
      `SELECT * FROM foods
      WHERE category = ?
      ORDER BY popularity DESC, name ASC
      LIMIT ?`,
      [category, limit],
    );

    const foods: FoodModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      foods.push(FoodModel.fromDbRow(result.rows.item(i)));
    }

    return foods;
  }

  /**
   * Get recently used foods for a user
   */
  async getRecentlyUsed(userId: string, limit: number = 20): Promise<FoodModel[]> {
    const [result] = await databaseService.executeSql(
      `SELECT DISTINCT f.* FROM foods f
      INNER JOIN diary_entries de ON f.id = de.food_id
      WHERE de.user_id = ?
      ORDER BY de.created_at DESC
      LIMIT ?`,
      [userId, limit],
    );

    const foods: FoodModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      foods.push(FoodModel.fromDbRow(result.rows.item(i)));
    }

    return foods;
  }

  /**
   * Get most popular foods
   */
  async getPopular(limit: number = 20): Promise<FoodModel[]> {
    const [result] = await databaseService.executeSql(
      `SELECT * FROM foods
      WHERE verified = 1
      ORDER BY popularity DESC, use_count DESC
      LIMIT ?`,
      [limit],
    );

    const foods: FoodModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      foods.push(FoodModel.fromDbRow(result.rows.item(i)));
    }

    return foods;
  }

  /**
   * Get user-created foods
   */
  async getUserCreated(userId: string): Promise<FoodModel[]> {
    const [result] = await databaseService.executeSql(
      `SELECT * FROM foods
      WHERE user_created = 1
      ORDER BY created_at DESC`,
      [],
    );

    const foods: FoodModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      foods.push(FoodModel.fromDbRow(result.rows.item(i)));
    }

    return foods;
  }

  /**
   * Update food
   */
  async update(foodId: string, updates: Partial<Food>): Promise<void> {
    const current = await this.getById(foodId);
    if (!current) {
      throw new Error('Food not found');
    }

    const updated = { ...current, ...updates };
    const row = new FoodModel(updated).toDbRow();

    const fields = Object.keys(row);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = [...Object.values(row), foodId];

    await databaseService.executeSql(
      `UPDATE foods SET ${setClause} WHERE id = ?`,
      values,
    );
  }

  /**
   * Increment food usage count
   */
  async incrementUsage(foodId: string): Promise<void> {
    await databaseService.executeSql(
      `UPDATE foods SET
        use_count = use_count + 1,
        popularity = popularity + 1,
        last_used = ?
      WHERE id = ?`,
      [new Date().toISOString(), foodId],
    );
  }

  /**
   * Delete food
   */
  async delete(foodId: string): Promise<void> {
    await databaseService.executeSql('DELETE FROM foods WHERE id = ?', [foodId]);
  }

  /**
   * Get favorite foods for user
   */
  async getFavorites(userId: string): Promise<FoodModel[]> {
    const [result] = await databaseService.executeSql(
      `SELECT f.* FROM foods f
      INNER JOIN favorite_foods ff ON f.id = ff.food_id
      WHERE ff.user_id = ?
      ORDER BY ff.added_at DESC`,
      [userId],
    );

    const foods: FoodModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      foods.push(FoodModel.fromDbRow(result.rows.item(i)));
    }

    return foods;
  }

  /**
   * Add food to favorites
   */
  async addToFavorites(userId: string, foodId: string): Promise<void> {
    const id = `fav_${userId}_${foodId}_${Date.now()}`;

    await databaseService.executeSql(
      'INSERT OR IGNORE INTO favorite_foods (id, user_id, food_id, added_at) VALUES (?, ?, ?, ?)',
      [id, userId, foodId, new Date().toISOString()],
    );
  }

  /**
   * Remove food from favorites
   */
  async removeFromFavorites(userId: string, foodId: string): Promise<void> {
    await databaseService.executeSql(
      'DELETE FROM favorite_foods WHERE user_id = ? AND food_id = ?',
      [userId, foodId],
    );
  }

  /**
   * Check if food is in favorites
   */
  async isFavorite(userId: string, foodId: string): Promise<boolean> {
    const [result] = await databaseService.executeSql(
      'SELECT COUNT(*) as count FROM favorite_foods WHERE user_id = ? AND food_id = ?',
      [userId, foodId],
    );

    return result.rows.item(0).count > 0;
  }

  /**
   * Get total food count
   */
  async getCount(): Promise<number> {
    const [result] = await databaseService.executeSql(
      'SELECT COUNT(*) as count FROM foods',
    );

    return result.rows.item(0).count;
  }
}

export const foodRepository = new FoodRepository();
