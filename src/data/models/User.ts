/**
 * User Data Model
 * Handles user data persistence and retrieval
 */

import { User, UserSettings, NutritionGoals, UserMeasurements } from '@/types';

export class UserModel {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  settings: UserSettings;
  goals: NutritionGoals;
  measurements: UserMeasurements;
  isPremium: boolean;
  premiumExpiresAt: Date | null;

  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.settings = data.settings;
    this.goals = data.goals;
    this.measurements = data.measurements;
    this.isPremium = data.isPremium;
    this.premiumExpiresAt = data.premiumExpiresAt;
  }

  /**
   * Convert model to database row format
   */
  toDbRow(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.createdAt.toISOString(),
      settings_json: JSON.stringify(this.settings),
      goals_json: JSON.stringify(this.goals),
      measurements_json: JSON.stringify(this.measurements),
      is_premium: this.isPremium ? 1 : 0,
      premium_expires_at: this.premiumExpiresAt?.toISOString() || null,
    };
  }

  /**
   * Create model from database row
   */
  static fromDbRow(row: any): UserModel {
    return new UserModel({
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: new Date(row.created_at),
      settings: JSON.parse(row.settings_json),
      goals: JSON.parse(row.goals_json),
      measurements: JSON.parse(row.measurements_json),
      isPremium: row.is_premium === 1,
      premiumExpiresAt: row.premium_expires_at ? new Date(row.premium_expires_at) : null,
    });
  }

  /**
   * Check if premium subscription is active
   */
  isPremiumActive(): boolean {
    if (!this.isPremium) {
      return false;
    }

    if (!this.premiumExpiresAt) {
      return true; // Lifetime premium
    }

    return this.premiumExpiresAt.getTime() > Date.now();
  }

  /**
   * Get premium days remaining
   */
  getPremiumDaysRemaining(): number | null {
    if (!this.isPremiumActive()) {
      return null;
    }

    if (!this.premiumExpiresAt) {
      return null; // Lifetime
    }

    const diff = this.premiumExpiresAt.getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Create default user settings
   */
  static createDefaultSettings(): UserSettings {
    return {
      units: 'metric',
      theme: 'auto',
      startOfWeek: 'monday',
      waterUnit: 'ml',
      notificationsEnabled: true,
      hapticFeedbackEnabled: true,
      biometricAuthEnabled: false,
    };
  }

  /**
   * Create default nutrition goals
   */
  static createDefaultGoals(): NutritionGoals {
    return {
      dailyCalories: 2000,
      carbs: 250,
      proteins: 100,
      fats: 67,
      water: 2000,
      goalType: 'maintain',
      activityLevel: 'moderate',
      weeklyWeightChange: 0,
    };
  }

  /**
   * Create default measurements
   */
  static createDefaultMeasurements(): UserMeasurements {
    return {
      currentWeight: 70,
      targetWeight: 70,
      height: 170,
      age: 30,
      gender: 'other',
    };
  }
}
