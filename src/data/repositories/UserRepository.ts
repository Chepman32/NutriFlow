/**
 * User Repository
 * Handles all user-related database operations
 */

import { databaseService } from '../database/DatabaseService';
import { UserModel } from '../models/User';
import { User, UserSettings, NutritionGoals, UserMeasurements } from '@/types';

export class UserRepository {
  /**
   * Create a new user
   */
  async create(user: User): Promise<UserModel> {
    const userModel = new UserModel(user);
    const row = userModel.toDbRow();

    await databaseService.executeSql(
      `INSERT INTO users (
        id, name, email, created_at, settings_json, goals_json,
        measurements_json, is_premium, premium_expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        row.id,
        row.name,
        row.email,
        row.created_at,
        row.settings_json,
        row.goals_json,
        row.measurements_json,
        row.is_premium,
        row.premium_expires_at,
      ],
    );

    return userModel;
  }

  /**
   * Get user by ID
   */
  async getById(userId: string): Promise<UserModel | null> {
    const [result] = await databaseService.executeSql(
      'SELECT * FROM users WHERE id = ?',
      [userId],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return UserModel.fromDbRow(result.rows.item(0));
  }

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<UserModel | null> {
    const [result] = await databaseService.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return UserModel.fromDbRow(result.rows.item(0));
  }

  /**
   * Get all users (should typically be only one in this app)
   */
  async getAll(): Promise<UserModel[]> {
    const [result] = await databaseService.executeSql('SELECT * FROM users');

    const users: UserModel[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      users.push(UserModel.fromDbRow(result.rows.item(i)));
    }

    return users;
  }

  /**
   * Update user
   */
  async update(userId: string, updates: Partial<User>): Promise<void> {
    const current = await this.getById(userId);
    if (!current) {
      throw new Error('User not found');
    }

    const updated = { ...current, ...updates };
    const row = new UserModel(updated).toDbRow();

    await databaseService.executeSql(
      `UPDATE users SET
        name = ?,
        email = ?,
        settings_json = ?,
        goals_json = ?,
        measurements_json = ?,
        is_premium = ?,
        premium_expires_at = ?
      WHERE id = ?`,
      [
        row.name,
        row.email,
        row.settings_json,
        row.goals_json,
        row.measurements_json,
        row.is_premium,
        row.premium_expires_at,
        userId,
      ],
    );
  }

  /**
   * Update user settings
   */
  async updateSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedSettings = { ...user.settings, ...settings };

    await databaseService.executeSql(
      'UPDATE users SET settings_json = ? WHERE id = ?',
      [JSON.stringify(updatedSettings), userId],
    );
  }

  /**
   * Update user goals
   */
  async updateGoals(userId: string, goals: Partial<NutritionGoals>): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedGoals = { ...user.goals, ...goals };

    await databaseService.executeSql(
      'UPDATE users SET goals_json = ? WHERE id = ?',
      [JSON.stringify(updatedGoals), userId],
    );
  }

  /**
   * Update user measurements
   */
  async updateMeasurements(
    userId: string,
    measurements: Partial<UserMeasurements>,
  ): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedMeasurements = { ...user.measurements, ...measurements };

    await databaseService.executeSql(
      'UPDATE users SET measurements_json = ? WHERE id = ?',
      [JSON.stringify(updatedMeasurements), userId],
    );
  }

  /**
   * Update premium status
   */
  async updatePremiumStatus(
    userId: string,
    isPremium: boolean,
    expiresAt: Date | null,
  ): Promise<void> {
    await databaseService.executeSql(
      'UPDATE users SET is_premium = ?, premium_expires_at = ? WHERE id = ?',
      [isPremium ? 1 : 0, expiresAt?.toISOString() || null, userId],
    );
  }

  /**
   * Delete user
   */
  async delete(userId: string): Promise<void> {
    await databaseService.executeSql('DELETE FROM users WHERE id = ?', [userId]);
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string): Promise<boolean> {
    const [result] = await databaseService.executeSql(
      'SELECT COUNT(*) as count FROM users WHERE email = ?',
      [email],
    );

    return result.rows.item(0).count > 0;
  }
}

export const userRepository = new UserRepository();
