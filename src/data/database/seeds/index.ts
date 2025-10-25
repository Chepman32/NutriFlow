/**
 * Database Seeding
 * Populate database with initial data
 */

import { databaseService } from '../DatabaseService';
import { seedFoods } from './foodSeedData';
import { FoodModel } from '@/data/models/Food';

export const seedDatabase = async (): Promise<void> => {
  console.log('Seeding database...');

  try {
    // Check if already seeded
    const [result] = await databaseService.executeSql(
      'SELECT COUNT(*) as count FROM foods WHERE verified = 1'
    );
    const count = result.rows.item(0).count;

    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    // Insert seed foods
    for (const foodData of seedFoods) {
      const food = new FoodModel({
        ...foodData,
        useCount: 0,
      } as any);

      const row = food.toDbRow();
      const fields = Object.keys(row);
      const placeholders = fields.map(() => '?').join(', ');
      const values = Object.values(row);

      await databaseService.executeSql(
        `INSERT INTO foods (${fields.join(', ')}) VALUES (${placeholders})`,
        values
      );
    }

    console.log(`Seeded ${seedFoods.length} foods`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
