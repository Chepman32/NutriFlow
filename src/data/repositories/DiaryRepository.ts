/**
 * Diary Repository
 * Handles all diary entry-related database operations
 */

import { databaseService } from '../database/DatabaseService';
import { DiaryEntryModel } from '../models/DiaryEntry';
import { DiaryEntry, DailyDiary, MealType, DailySummary } from '@/types';
import { format } from 'date-fns';

export class DiaryRepository {
  /**
   * Create a new diary entry
   */
  async create(entry: DiaryEntry): Promise<DiaryEntryModel> {
    const entryModel = new DiaryEntryModel(entry);
    const row = entryModel.toDbRow();

    await databaseService.executeSql(
      `INSERT INTO diary_entries (
        id, user_id, date, meal_type, food_id, servings,
        calories, carbs, proteins, fats, created_at, notes, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        row.id,
        row.user_id,
        row.date,
        row.meal_type,
        row.food_id,
        row.servings,
        row.calories,
        row.carbs,
        row.proteins,
        row.fats,
        row.created_at,
        row.notes,
        row.image_url,
      ],
    );

    // Update daily summary
    await this.updateDailySummary(entry.userId, entry.date);

    return entryModel;
  }

  /**
   * Get diary entry by ID
   */
  async getById(entryId: string): Promise<DiaryEntryModel | null> {
    const [result] = await databaseService.executeSql(
      `SELECT de.*, f.name as food_name, f.brand as food_brand,
        f.serving_size, f.serving_unit, f.calories as food_calories,
        f.carbs as food_carbs, f.proteins as food_proteins, f.fats as food_fats,
        f.category as food_category, f.verified, f.user_created, f.popularity, f.use_count
      FROM diary_entries de
      LEFT JOIN foods f ON de.food_id = f.id
      WHERE de.id = ?`,
      [entryId],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return DiaryEntryModel.fromDbRowWithFood(result.rows.item(0));
  }

  /**
   * Get entries for a specific date
   */
  async getByDate(userId: string, date: Date): Promise<DiaryEntryModel[]> {
    const dateStr = format(date, 'yyyy-MM-dd');

    const [result] = await databaseService.executeSql(
      `SELECT de.*, f.name as food_name, f.brand as food_brand,
        f.serving_size, f.serving_unit, f.calories as food_calories,
        f.carbs as food_carbs, f.proteins as food_proteins, f.fats as food_fats,
        f.category as food_category, f.verified, f.user_created, f.popularity, f.use_count
      FROM diary_entries de
      LEFT JOIN foods f ON de.food_id = f.id
      WHERE de.user_id = ? AND de.date = ?
      ORDER BY de.created_at ASC`,
      [userId, dateStr],
    );

    const entries: DiaryEntryModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(DiaryEntryModel.fromDbRowWithFood(result.rows.item(i)));
    }

    return entries;
  }

  /**
   * Get entries for a specific date and meal type
   */
  async getByDateAndMeal(
    userId: string,
    date: Date,
    mealType: MealType,
  ): Promise<DiaryEntryModel[]> {
    const dateStr = format(date, 'yyyy-MM-dd');

    const [result] = await databaseService.executeSql(
      `SELECT de.*, f.name as food_name, f.brand as food_brand,
        f.serving_size, f.serving_unit, f.calories as food_calories,
        f.carbs as food_carbs, f.proteins as food_proteins, f.fats as food_fats,
        f.category as food_category, f.verified, f.user_created, f.popularity, f.use_count
      FROM diary_entries de
      LEFT JOIN foods f ON de.food_id = f.id
      WHERE de.user_id = ? AND de.date = ? AND de.meal_type = ?
      ORDER BY de.created_at ASC`,
      [userId, dateStr, mealType],
    );

    const entries: DiaryEntryModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(DiaryEntryModel.fromDbRowWithFood(result.rows.item(i)));
    }

    return entries;
  }

  /**
   * Get entries for a date range
   */
  async getByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DiaryEntryModel[]> {
    const startStr = format(startDate, 'yyyy-MM-dd');
    const endStr = format(endDate, 'yyyy-MM-dd');

    const [result] = await databaseService.executeSql(
      `SELECT de.*, f.name as food_name, f.brand as food_brand,
        f.serving_size, f.serving_unit, f.calories as food_calories,
        f.carbs as food_carbs, f.proteins as food_proteins, f.fats as food_fats,
        f.category as food_category, f.verified, f.user_created, f.popularity, f.use_count
      FROM diary_entries de
      LEFT JOIN foods f ON de.food_id = f.id
      WHERE de.user_id = ? AND de.date BETWEEN ? AND ?
      ORDER BY de.date DESC, de.created_at ASC`,
      [userId, startStr, endStr],
    );

    const entries: DiaryEntryModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(DiaryEntryModel.fromDbRowWithFood(result.rows.item(i)));
    }

    return entries;
  }

  /**
   * Update diary entry
   */
  async update(entryId: string, updates: Partial<DiaryEntry>): Promise<void> {
    const current = await this.getById(entryId);
    if (!current) {
      throw new Error('Diary entry not found');
    }

    const updated = { ...current, ...updates };
    const row = new DiaryEntryModel(updated).toDbRow();

    await databaseService.executeSql(
      `UPDATE diary_entries SET
        date = ?, meal_type = ?, servings = ?, calories = ?,
        carbs = ?, proteins = ?, fats = ?, notes = ?, image_url = ?
      WHERE id = ?`,
      [
        row.date,
        row.meal_type,
        row.servings,
        row.calories,
        row.carbs,
        row.proteins,
        row.fats,
        row.notes,
        row.image_url,
        entryId,
      ],
    );

    // Update daily summary
    await this.updateDailySummary(current.userId, current.date);
  }

  /**
   * Delete diary entry
   */
  async delete(entryId: string): Promise<void> {
    const entry = await this.getById(entryId);
    if (!entry) {
      return;
    }

    await databaseService.executeSql('DELETE FROM diary_entries WHERE id = ?', [entryId]);

    // Update daily summary
    await this.updateDailySummary(entry.userId, entry.date);
  }

  /**
   * Update or create daily summary
   */
  private async updateDailySummary(userId: string, date: Date): Promise<void> {
    const dateStr = format(date, 'yyyy-MM-dd');

    // Calculate totals from entries
    const [result] = await databaseService.executeSql(
      `SELECT
        COALESCE(SUM(calories), 0) as total_calories,
        COALESCE(SUM(carbs), 0) as total_carbs,
        COALESCE(SUM(proteins), 0) as total_proteins,
        COALESCE(SUM(fats), 0) as total_fats
      FROM diary_entries
      WHERE user_id = ? AND date = ?`,
      [userId, dateStr],
    );

    const totals = result.rows.item(0);

    // Upsert daily summary
    await databaseService.executeSql(
      `INSERT OR REPLACE INTO daily_summaries
        (id, user_id, date, total_calories, total_carbs, total_proteins, total_fats, water_intake, weight, steps)
      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        COALESCE((SELECT water_intake FROM daily_summaries WHERE user_id = ? AND date = ?), 0),
        (SELECT weight FROM daily_summaries WHERE user_id = ? AND date = ?),
        (SELECT steps FROM daily_summaries WHERE user_id = ? AND date = ?)
      )`,
      [
        `summary_${userId}_${dateStr}`,
        userId,
        dateStr,
        totals.total_calories,
        totals.total_carbs,
        totals.total_proteins,
        totals.total_fats,
        userId,
        dateStr,
        userId,
        dateStr,
        userId,
        dateStr,
      ],
    );
  }

  /**
   * Get daily summary
   */
  async getDailySummary(userId: string, date: Date): Promise<DailySummary | null> {
    const dateStr = format(date, 'yyyy-MM-dd');

    const [result] = await databaseService.executeSql(
      'SELECT * FROM daily_summaries WHERE user_id = ? AND date = ?',
      [userId, dateStr],
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows.item(0);
    return {
      id: row.id,
      userId: row.user_id,
      date: new Date(row.date),
      waterIntake: row.water_intake,
      weight: row.weight,
      steps: row.steps,
      totalCalories: row.total_calories,
      totalCarbs: row.total_carbs,
      totalProteins: row.total_proteins,
      totalFats: row.total_fats,
      notes: row.notes,
    };
  }

  /**
   * Update water intake
   */
  async updateWaterIntake(userId: string, date: Date, waterIntake: number): Promise<void> {
    const dateStr = format(date, 'yyyy-MM-dd');

    await databaseService.executeSql(
      `INSERT OR REPLACE INTO daily_summaries
        (id, user_id, date, water_intake, total_calories, total_carbs, total_proteins, total_fats)
      VALUES (
        ?,
        ?,
        ?,
        ?,
        COALESCE((SELECT total_calories FROM daily_summaries WHERE user_id = ? AND date = ?), 0),
        COALESCE((SELECT total_carbs FROM daily_summaries WHERE user_id = ? AND date = ?), 0),
        COALESCE((SELECT total_proteins FROM daily_summaries WHERE user_id = ? AND date = ?), 0),
        COALESCE((SELECT total_fats FROM daily_summaries WHERE user_id = ? AND date = ?), 0)
      )`,
      [
        `summary_${userId}_${dateStr}`,
        userId,
        dateStr,
        waterIntake,
        userId,
        dateStr,
        userId,
        dateStr,
        userId,
        dateStr,
        userId,
        dateStr,
      ],
    );
  }

  /**
   * Update weight
   */
  async updateWeight(userId: string, date: Date, weight: number): Promise<void> {
    const dateStr = format(date, 'yyyy-MM-dd');

    await databaseService.executeSql(
      'UPDATE daily_summaries SET weight = ? WHERE user_id = ? AND date = ?',
      [weight, userId, dateStr],
    );
  }

  /**
   * Get entry count for user
   */
  async getEntryCount(userId: string): Promise<number> {
    const [result] = await databaseService.executeSql(
      'SELECT COUNT(*) as count FROM diary_entries WHERE user_id = ?',
      [userId],
    );

    return result.rows.item(0).count;
  }
}

export const diaryRepository = new DiaryRepository();
